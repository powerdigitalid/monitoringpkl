import { useRouter } from "next/router";
import { useEffect } from "react";
import TableDudi from "../../components/table/table_dudi";
import ContentHeader from "../../components/utils/content-header";
import Layout from "../../components/utils/layout";
import useLoginStore from "../../store/store";

export default function DuDi(){
  const router = useRouter()
  const user = useLoginStore((state) => state.user)
  const role = useLoginStore((state) => state.role)
  useEffect(() =>{
    if (user === '' && role ==='') router.push('/login')
  })
  const breadcrumbs = [
    {
      isActive: false,
      text: 'DUDI',
      url: '#'
    },
    {
      isActive: true,
      text: 'Data DUDI',
      url: '#'
    },
  ]
  return (
    <Layout title="DUDI" activeNavBarItem={6} activeUser={user}>
      <ContentHeader title={'Data DUDI'} listBreadcrumb={breadcrumbs} />
      <TableDudi />
    </Layout>
  )
}