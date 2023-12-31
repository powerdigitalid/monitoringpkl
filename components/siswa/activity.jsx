import { useEffect, useState } from "react";
import { supabase } from "../../libs/supabase.lib";
import useLoginStore from "../../store/store";
import CardActivity from "../activity_guru/card-activity";
import EditActivity from "./edit-activity";

export default function Activity() {
  const role = useLoginStore((state) => state.role)
  const user = useLoginStore((state) => state.id)
  const [loading, setLoading] = useState(false)
  const [log, setLog] = useState([])
  const [dataFilter, setDataFilter] = useState([]);

  console.log(user)

  const fetchLog = async () => {
    setLoading(true)
    let { data, error } = await supabase.from('LogSiswa').select('*, Dudi (id, nama_dudi, userId), DataGuru (nip, nama_guru, userId)')
    if (error) {
      console.error(error)
    } else {
      setLog(data)
    }
    setLoading(false)
  }
  const downloadImage = (image) => {
    try {
      return `https://xuiabtqtmfhgdqyrppex.supabase.co/storage/v1/object/public/log-siswa-images/${image}`
    } catch (error) {
      console.error(error)
    }
  }

  const filterByDudi = () => {
    if (role === 'dudi') {
      const filtered = log.filter((item) => item.Dudi.userId === user);
      console.log(filtered)
      setDataFilter(filtered);
    } else {
      setDataFilter(log);
    }
  }

  const filterByGuru = () => {
    if (role === 'guru') {
      const filtered = log.filter((item) => item.DataGuru.userId === user);
      setDataFilter(filtered);
    } else {
      setDataFilter(log);
    }
  }

  
  useEffect(() => {
    setTimeout(() => {
      fetchLog()
    }, 3000)
  }, [log])

  useEffect(() => {
    filterByDudi()
  }, [log])

  useEffect(() => {
    filterByGuru()
  }, [log])

  return (
    <section className="content">
      <div className="container-fluid">
        {/* Timelime example  */}
        {role === 'siswa' ? <EditActivity /> : <></>}
        <div className="row">
          <div className="col-md-12">
            {/* The time line */}
            <div className="timeline">
              {dataFilter.slice(0).reverse().map((logitem, i) => (
                <CardActivity nama={logitem.nama + ` - ${logitem.Dudi.nama_dudi}`} kegiatan={logitem.kegiatan} timestamps={logitem.createdAt} image={downloadImage(logitem.image)} key={i} />
              ))}
            </div>
          </div>
          {/* /.col */}
        </div>
      </div>
      {/* /.timeline */}
    </section>
  )
}