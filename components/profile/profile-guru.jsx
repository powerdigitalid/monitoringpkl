import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import { supabase } from "../../libs/supabase.lib"
import Card from "../utils/card"

export default function ProfileGuru({ username = '' }) {
  const [namaGuru, setNamaGuru] = useState('')
  const [nip, setNip] = useState('')
  const [alamat, setAlamat] = useState('')
  const [no_telp, setNo_telp] = useState('')
  const [guruData, setGuruData] = useState([])
  const handleGetUserData = async () => {
    let { data, error } = await supabase.from('User').select().eq('username', username)
    if (error) {
      console.error(error)
    } else {
      console.log(data)
      handleGetGuruData(data[0].id)
    }
  }
  const handleGetGuruData = async (userid) => {
    let { data, error } = await supabase.from('DataGuru').select().eq('userId', userid)
    if (error) {
      console.error(error)
    } else {
      setGuruData(data)
      setNamaGuru(data[0].nama_guru)
      setNip(data[0].nip)
      setAlamat(data[0].alamat)
      setNo_telp(data[0].no_telp)
    }
  }
  const handleUpdateGuruData = async (e) => {
    e.preventDefault()
    let { error } = await supabase.from('DataGuru').update({ nama_guru: namaGuru, alamat: alamat, no_telp: no_telp }).eq('nip', nip)
    if (error) {
      console.error(error)
    } else {
      Swal.fire('Success', 'Data berhasil diperbarui!', 'success')
    }
  }
  useEffect(() => {
    handleGetUserData()
  }, [])
  return (
    <section className="content">
      <Card cardTitle="Profile" cardIcon="fa-user">
        <div className="container-fluid">
          <form onSubmit={handleUpdateGuruData}>
            <div className="form-group">
              <div className="row">
                <div className="col-md-6">
                  <div>
                    <label htmlFor="exampleInputName1">Nama Guru</label>
                    <input type="text" className="form-control form-control-sm text-left" id="exampleInputName1" value={namaGuru} onChange={(e) => setNamaGuru(e.target.value)} required />
                  </div>
                </div>
                <div className="col-md-6">
                  <div>
                    <label htmlFor="exampleInputName2">NIP</label>
                    <input type="text" className="form-control form-control-sm text-left text-left" id="exampleInputName2" value={nip} onChange={(e) => setNip(e.target.value)} disabled />
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
                    <input type="tel" className="form-control form-control-sm text-left" value={no_telp} onChange={(e) => setNo_telp(e.target.value)} required />
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <button type="submit" className="btn btn-primary">Simpan</button>
            </div>
          </form>
        </div>
      </Card>
    </section>
  )
}