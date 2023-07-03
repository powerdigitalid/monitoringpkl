import { useRouter } from "next/router";
import { useEffect } from "react";
import Activity from "../../components/siswa/activity";
import ContentHeader from "../../components/utils/content-header";
import Layout from "../../components/utils/layout";
import useLoginStore from "../../store/store";

export default function ActivitySiswa(){
  const router = useRouter()
  const user = useLoginStore((state) => state.user)
  const role = useLoginStore((state) => state.role)
  // console.log(first)
  useEffect(() =>{
    if (user === '' && role ==='') router.push('/login')
  })
  const breadcrumbs = [
    {
      isActive: false,
      text: 'Siswa',
      url: '#'
    },
    {
      isActive: true,
      text: 'Activity',
      url: '#'
    },
  ]
  return (
    <Layout title="Activity Siswa - Monitoring PKL" activeNavBarItem={5} activeUser={user}>
      <ContentHeader title={'Aktivitas Siswa'} listBreadcrumb={breadcrumbs} />
      <Activity />
    </Layout>
  )
}