import Head from 'next/head'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import Card from '../../components/utils/card'
import { supabase } from '../../libs/supabase.lib'
export default function ProfileDudi({ username = '' }) {
  const [namaDudi, setNamaDudi] = useState('')
  const [alamat, setAlamat] = useState('')
  const [telepon, setTelepon] = useState('')
  const [dudiData, setDudiData] = useState([])
  const handleGetUserData = async () => {
    let { data, error } = await supabase.from('User').select().eq('username', username)
    if (error) {
      console.error(error)
    } else {
      console.log(data)
      
      handleGetDudiData(data[0].id)
    }
  }
  const handleGetDudiData = async (userid) => {
    let { data, error } = await supabase.from('Dudi').select().eq('userId', userid)
    if (error) {
      console.error(error)
    } else {
      setDudiData(data)
      setNamaDudi(data[0].nama_dudi)
      setAlamat(data[0].alamat)
      setTelepon(data[0].no_telp)
    }

  }
  const handleUpdateDudiData = async (e) => {
    e.preventDefault()
    let { error } = await supabase.from('Dudi').update({ nama_dudi: namaDudi, alamat: alamat, no_telp: telepon }).eq('id', dudiData[0].id)
    if (error) console.error(error)
    else Swal.fire('Success', 'Data berhasil diperbarui!', 'success')
  }
  useEffect(() => {
    handleGetUserData()
  }, [])
  return (
    <section className="content">
      <Head>
        <title>Profile - Monitoring PKL</title>
      </Head>
      <Card cardTitle="Profile" cardIcon="fa-user">
        <div className="container-fluid">
          <form onSubmit={handleUpdateDudiData}>
            <div className="form-group">
              <div className="row">
                <div className="col-md-12">
                  <div>
                    <label htmlFor="exampleInputName1">Nama DUDI</label>
                    <input type="text" className="form-control form-control-sm text-left" id="exampleInputName1" value={namaDudi} onChange={(e) => setNamaDudi(e.target.value)} required />
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-md-8">
                  <div>
                    <label htmlFor="alamat">Alamat</label>
                    <input type="textarea" className="form-control form-control-sm text-left" value={alamat} onChange={(e) => setAlamat(e.target.value)} required />
                  </div>
                </div>
                <div className="col-md-4">
                  <div>
                    <label htmlFor="alamat">Telpon</label>
                    <input type="tel" className="form-control form-control-sm text-left" value={telepon} onChange={(e) => setTelepon(e.target.value)} required />
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <button type='submit' className="btn btn-primary">Update</button>
            </div>
          </form>
        </div>
      </Card>
    </section>
  )
}