import { useRouter } from "next/router"
import { useState } from "react"
import Swal from "sweetalert2"
import { supabase } from "../libs/supabase.lib"
import Head from "next/head";
import Link from "next/link";

export default function Register() {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [nisn, setNisn] = useState('')
  const [nip, setNip] = useState('')
  const [roleState, setRoleState] = useState('')
  let registerData = [
    {
      nisn: nisn,
      nama_siswa: username,
      jurusan: '-',
      deskripsi: '-',
      alamat: '-',
      no_telp: '081234234234',
      ttl: '2000-01-01',
      nama_ortu: '',
      no_telp_ortu: '081234234234',
      userId: userdata ? userdata[0].id : null,
      DudiId: parseInt(selectedDudi)
    }
  ]
  let additionalComponent = null
  if (roleState === 'guru') additionalComponent = AdditionalForm({type: 'NIP'})
  if (roleState === 'siswa') additionalComponent = AdditionalForm({type: 'NISN'})
  return (
    <div className="container-fluid">
      <Head>
        <title>Register - Monitoring PKL</title>
      </Head>
      <div className="row justify-content-md-center">
        <div className="card">
          <div className="card-body">
            <div className="">
              <form className="px-4 py-3" >
                <div className="form-group">
                  <label htmlFor="exampleDropdownFormEmail1">Email</label>
                  <input type="email" className="form-control" id="exampleDropdownFormEmail1" placeholder="Email" />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleDropdownFormUsername">Username</label>
                  <input type="text" className="form-control" id="exampleDropdownFormUsername" placeholder="Username" />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleDropdownFormPassword1">Password</label>
                  <input type="password" className="form-control" id="exampleDropdownFormPassword1" placeholder="Password" />
                </div>
                <div className="form-group">
                  <label htmlFor="selectRole">Daftar Sebagai</label>
                  <select className="form-control" value={roleState} onChange={(e) => setRoleState(e.target.value)}>
                    <option value="" selected>Pilih...</option>
                    <option value="siswa">Siswa</option>
                    <option value="guru">Guru</option>
                    <option value="dudi">DUDI</option>
                  </select>
                </div>
                {additionalComponent}
                <p>Sudah Punya Akun? <Link href="/login">Sign In</Link></p>
                <button type="submit" className="btn btn-primary">Register</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function AdditionalForm({ type = '' }) {
  return (
    <div className="form-group">
      <label htmlFor={type}>{type}</label>
      <input type="text" className="form-control" id={type} placeholder={type} />
    </div>
  )
}