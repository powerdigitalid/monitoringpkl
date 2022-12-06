import { useEffect, useState } from "react";
import { supabase } from "../../libs/supabase.lib"
import SmallCard from "../utils/card-small";
import ContentHeader from "../utils/content-header";

export default function AdminDashboardContent() {
  const breadcrumbs = [
    {
      isActive: false,
      text: 'Admin',
      url: '#'
    },
    {
      isActive: true,
      text: 'Dashboard',
      url: '#'
    },
  ]
  const [siswaCounter, setSiswaCounter] = useState(0)
  const [guruCounter, setGuruCounter] = useState(0)
  const [dudiCounter, setDudiCounter] = useState(0)
  const handleGetCount = async (role) => {
    const { count, error } = await supabase.from('User').select('*', { count: 'exact', head: true }).eq('role', role)
    if (error) {
      console.error(error)
    } else {
      console.info('data: ', count)
      switch (role) {
        case 'siswa':
          setSiswaCounter(count)
          break;
        case 'dudi':
          setDudiCounter(count)
          break;
        case 'guru':
          setGuruCounter(count)
          break;
      
        default:
          break;
      }
    }
  }
  useEffect(() => {
    handleGetCount('siswa')
    handleGetCount('dudi')
    handleGetCount('guru')
  }, [])
  return (
    <div className="">
      <ContentHeader title={'Dashboard'} listBreadcrumb={breadcrumbs} />
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-4 col-6">
              <SmallCard title={siswaCounter} caption={'Total Siswa'} icon={'ion-android-people'} background={'bg-success'} />
            </div>
            <div className="col-lg-4 col-6">
              <SmallCard title={guruCounter} caption={'Total Guru'} icon={'ion-android-people'} background={'bg-info'} />
            </div>
            <div className="col-lg-4 col-6">
              <SmallCard title={dudiCounter} caption={'Total DUDI'} icon={'ion-android-map'} background={'bg-primary'} />
            </div>
          </div>
        </div>
      </section>
    </div>

  )
}