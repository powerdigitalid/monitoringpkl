import { useRouter } from "next/router";
import { useEffect } from "react";
import AdminDashboardContent from "../../components/admin_dashboard/contents";
import Layout from "../../components/utils/layout";
import useLoginStore from "../../store/store";

export default function AdminHome(){
  const router = useRouter()
  const user = useLoginStore((state) => state.user)
  const role = useLoginStore((state) => state.role)
  useEffect(() =>{
    if (user === '' && role ==='') router.push('/login')
  })
  console.log(user, role)
  return (
    <Layout title="Admin - Monitoring PKL" activeNavBarItem={0} activeUser={user}>
      <AdminDashboardContent />
    </Layout>
  )
}
