import Layout from "../../components/utils/layout";
import Activity from "../../components/activity_guru/activity";
import ContentHeader from "../../components/utils/content-header";
import useLoginStore from "../../store/store";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function ActivityGuru(){
  const router = useRouter()
  const user = useLoginStore((state) => state.user)
  const role = useLoginStore((state) => state.role)
  useEffect(() =>{
    if (user === '' && role ==='') router.push('/login')
  })
  const breadcrumbs = [
    {
      isActive: false,
      text: 'Guru',
      url: '#'
    },
    {
      isActive: true,
      text: 'Activity',
      url: '#'
    },
  ]
  return (
    <Layout title="Activity Guru - Monitoring PKL" activeNavBarItem={3} activeUser={'Admin'}>
      <ContentHeader title={'Aktivitas Guru'} listBreadcrumb={breadcrumbs} />
      <Activity />
    </Layout>
  )
}