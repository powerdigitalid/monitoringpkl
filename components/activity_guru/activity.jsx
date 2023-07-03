import { useEffect, useState } from "react";
import { supabase } from "../../libs/supabase.lib";
import CardActivity from "./card-activity";
import EditActivity from "./edit-activity";

export default function Activity() {
    const [loading, setLoading] = useState(false)
    const [log, setLog] = useState([])
    const fetchLog = async () => {
        setLoading(true)
        let { data, error } = await supabase.from('LogGuru').select()
        if (error) {
            console.error(error)
        } else {
            setLog(data)
        }
        setLoading(false)
    }
    const downloadImage = (image) => {
        try {
            return `https://xuiabtqtmfhgdqyrppex.supabase.co/storage/v1/object/public/log-guru-images/${image}`
        } catch (error) {
          console.error(error)
        }
      }

    useEffect(() => {
        fetchLog()
    })
    return (
        <section className="content">
            <div className="container-fluid">
                {/* Timelime example  */}
                <EditActivity />
                <div className="row">
                    <div className="col-md-12">
                        {/* The time line */}
                        <div className="timeline">
                            {log.slice(0).reverse().map((logitem, i) => (
                                <CardActivity nama={logitem.nama} kegiatan={logitem.kegiatan} timestamps={logitem.createdAt} image={downloadImage(logitem.image)} key={i} />
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