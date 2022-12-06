import { useRouter } from "next/router";
import { useEffect } from "react";
import TableSiswa from "../../components/table/table_siswa";
import ContentHeader from "../../components/utils/content-header";
import Layout from "../../components/utils/layout";
import useLoginStore from "../../store/store";

export default function DataSiswa(){
  const router = useRouter()
  const user = useLoginStore((state) => state.user)
  const role = useLoginStore((state) => state.role)
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
      text: 'Data Siswa',
      url: '#'
    },
  ]
  return (
    <Layout title="Data Siswa - Monitoring PKL" activeNavBarItem={4} activeUser={user}>
      <ContentHeader title={'Data Siswa'} listBreadcrumb={breadcrumbs} />
      <TableSiswa />
    </Layout>
  )
}