import { useRouter } from "next/router"
import { useEffect } from "react"
import ProfileDudi from '../../components/profile/profile-dudi'
import Layout from "../../components/utils/layout"
import useLoginStore from "../../store/store"

export default function Profile() {
  const userIn = useLoginStore((state) => state.user)
  const role = useLoginStore((state) => state.role)
  const router = useRouter()
  const { user } = router.query
  useEffect(() => {
    if (userIn === '' && role === '') router.push('/login')
  })
  return (
    <Layout activeUser={userIn} activeNavBarItem={'-'}>
      <ProfileDudi />
    </Layout>
  )
}