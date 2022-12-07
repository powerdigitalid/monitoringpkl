import { useRouter } from "next/router"
import { useEffect } from "react"
import ProfileDudi from '../../components/profile/profile-dudi'
import ProfileSiswa from '../../components/profile/profile-siswa'
import ProfileGuru from '../../components/profile/profile-guru'
import Layout from "../../components/utils/layout"
import useLoginStore from "../../store/store"
import Head from "next/head"

export default function Profile() {
  const userIn = useLoginStore((state) => state.user)
  const role = useLoginStore((state) => state.role)
  const router = useRouter()
  const { user } = router.query
  let profileLayout;
  switch (role) {
    case 'dudi':
      profileLayout = <ProfileDudi username={user}/>
      break;
    case 'siswa':
      profileLayout = <ProfileSiswa username={user}/>
      break;
    case 'guru':
      profileLayout = <ProfileGuru username={user}/>
      break;
  
    default:
      break;
  }
  useEffect(() => {
    if (userIn === '' && role === '') router.push('/login')
  })
  return (
    <Layout activeUser={userIn} activeNavBarItem={'-'}>
      <Head>
        <title>Profile - Monitoring PKL</title>
      </Head>
      {profileLayout}
    </Layout>
  )
}