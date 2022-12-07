import { useEffect, useState } from "react"
import { supabase } from "../../libs/supabase.lib"
import Swal from "sweetalert2"
import Head from "next/head";
import Link from "next/link";
import useLoginStore from "../../store/store";
import { useRouter } from "next/router";

export default function Register() {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const role = useLoginStore((state) => state.role)
  const clearForm = () => {
    setEmail('')
    setUsername('')
    setPassword('')
  }
  const handleRegisterAuth = async () => {
    let {data, error} = await supabase.auth.signUp({
      email: email,
      password: password
    })
    if (error) {
      console.error(error)
      return false
    } else {
      return true
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    let isRegAuth = await handleRegisterAuth()
    if(isRegAuth) {
      let {data, error} = await supabase.from('User').insert({
        username: username,
        password: password,
        email: email,
        role: 'admin'
      })
      if (error){ 
        console.error(error)
        Swal.fire('Error', 'Cannot register new Admin! Please use fresh email!', 'error')
      }
      else {
        setLoading(false)
        clearForm()
        Swal.fire('Success', 'Successfully register new Admin, please confirm the provided email!', 'info')
      }
    } else {
      Swal.fire('error', 'Error while registering new Admin! Please re-check your input data!', 'error')
    }
  }
  useEffect(() => {
    if(role !== 'admin') router.push('/login')
  })
  return (
    <div className="container-fluid">
      <Head>
        <title>Register - Monitoring PKL</title>
      </Head>
      <div className="row justify-content-md-center">
        <div className="card">
          <div className="card-body">
            <div className="">
              <form className="px-4 py-3" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="exampleDropdownFormEmail1">Email</label>
                  <input type="email" className="form-control" id="exampleDropdownFormEmail1" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleDropdownFormUsername">Username</label>
                  <input type="text" className="form-control" id="exampleDropdownFormUsername" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleDropdownFormPassword1">Password</label>
                  <input type="password" className="form-control" id="exampleDropdownFormPassword1" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <p>Sudah Punya Akun? <Link href="/login">Sign In</Link></p>
                <button type="submit" className="btn btn-primary">Register</button>
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
