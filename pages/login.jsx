import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import { supabase } from "../libs/supabase.lib"
import useLoginStore from "../store/store"

export default function Login() {
  const router = useRouter()
  const setLogin = useLoginStore((state) => state.setLogin)
  const setUser = useLoginStore((state) => state.setUser)
  const setUserId = useLoginStore((state) => state.setUserId)
  const setRole = useLoginStore((state) => state.setRole)
  const setEmail = useLoginStore((state) => state.setEmail)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [role, setR] = useState('')
  const [loading, setLoading] = useState(false)
  const handleGetUserData = async () => {
    const { data, error } = await supabase.from('User').select().match({ email: username })
    if (error) {
      return false
    } else {
      setLogin()
      setUserId(data[0].id)
      setUser(data[0].username)
      setRole(data[0].role)
      setEmail(data[0].email)
      setR(data[0].role)
      console.info(data)
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: username,
      password: password
    })
    if (error) {
      setLoading(false)
      Swal.fire('Error', 'Invalid username or password!', 'warning')
    } else {
      handleGetUserData()
    }
  }
  useEffect(() => {
    switch (role) {
      case 'admin':
        router.push('/admin')
        break;
      case 'guru':
        router.push('/siswa')
        break
      case 'siswa':
        router.push('/siswa/activity')
        break
      case 'dudi':
        router.push('/siswa')

      default:
        break;
    }
  })
  return (
    <div className="container-fluid">
      <Head>
        <title>Login - Monitoring PKL</title>
      </Head>
      <div className="row justify-content-md-center">
        <div className="card">
          <div className="card-body">
            <div className="">
              <form className="px-4 py-3" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="exampleDropdownFormEmail1">Username</label>
                  <input type="email" className="form-control" id="exampleDropdownFormEmail1" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleDropdownFormPassword1">Password</label>
                  <input type="password" className="form-control" id="exampleDropdownFormPassword1" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Sign in</button>
                <div className="spinner-border text-primary float-right" role="status" hidden={loading == false ? true : false}>
                  <span className="sr-only">Loading...</span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}