import ContentHeader from "../../components/utils/content-header";
import Layout from "../../components/utils/layout";
import TableGuru from "../../components/table/table_guru";
import useLoginStore from "../../store/store";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function DataGuru(){
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
      text: 'Data Guru',
      url: '#'
    },
  ]

  return (
    <Layout title="Data Guru - Montoring PKL" activeNavBarItem={2} activeUser={user}>
      <ContentHeader title={'Data Guru'} listBreadcrumb={breadcrumbs} />
      <TableGuru />
    </Layout>
  )
}