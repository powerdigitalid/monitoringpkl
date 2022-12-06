import TambahDataContents from "../../components/admin_dashboard/tambahdatacontents";
import Layout from "../../components/utils/layout";
import TableUsers from "../../components/table/table_users"
import useLoginStore from "../../store/store";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function TambahDataPage() {
  const router = useRouter()
  const user = useLoginStore((state) => state.user)
  const role = useLoginStore((state) => state.role)
  useEffect(() =>{
    if (user === '' && role ==='') router.push('/login')
  })
  return (
    <Layout title="Tambah Data - Monitoring PKL" activeNavBarItem={1} activeUser={user}>
      <TambahDataContents />
      <TableUsers />
    </Layout>
  )
}