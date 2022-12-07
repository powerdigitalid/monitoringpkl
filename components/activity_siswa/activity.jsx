import { useEffect, useState } from "react";
import { supabase } from "../../libs/supabase.lib";
import useLoginStore from "../../store/store";
import CardActivity from "../activity_guru/card-activity";
import EditActivity from "./edit-activity";

export default function Activity() {
  const role = useLoginStore((state) => state.role)
  const [loading, setLoading] = useState(false)
  const [log, setLog] = useState([])
  const fetchLog = async () => {
    setLoading(true)
    let { data, error } = await supabase.from('LogSiswa').select('*, Dudi (id, nama_dudi)')
    if (error) {
      console.error(error)
    } else {
      setLog(data)
    }
    setLoading(false)
  }
  const downloadImage = (image) => {
    try {
      return `https://owmkwndkjubdliomrozw.supabase.co/storage/v1/object/public/log-siswa-images/${image}`
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    fetchLog()
  }, [log])
  return (
    <section className="content">
      <div className="container-fluid">
        {/* Timelime example  */}
        {role === 'admin' && role === 'siswa' ? <EditActivity /> : <></>}
        <div className="row">
          <div className="col-md-12">
            {/* The time line */}
            <div className="timeline">
              {log.slice(0).reverse().map((logitem, i) => (
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