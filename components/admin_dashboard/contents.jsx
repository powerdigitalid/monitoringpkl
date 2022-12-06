import Card from "../utils/card";
import SmallCard from "../utils/card-small";
import ContentHeader from "../utils/content-header";

export default function AdminDashboardContent(){
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
  
  return (
    <div className="">
      <ContentHeader title={'Dashboard'} listBreadcrumb={breadcrumbs} />
      <section className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-4 col-6">
            <SmallCard title={'150'} caption={'Total Siswa'} icon={'ion-android-people'} background={'bg-success'} />
          </div>
          <div className="col-lg-4 col-6">
            <SmallCard title={'150'} caption={'Total Guru'} icon={'ion-android-people'} background={'bg-info'} />
          </div>
          <div className="col-lg-4 col-6">
            <SmallCard title={'150'} caption={'Total DUDI'} icon={'ion-android-map'} background={'bg-primary'} />
          </div>
        </div>
      </div>
    </section>
    </div>
    
  )
}