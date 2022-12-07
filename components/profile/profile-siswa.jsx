import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import { supabase } from "../../libs/supabase.lib"
import Card from "../utils/card"

export default function ProfileSiswa({ username = '' }) {
  const [namaSiswa, setNamaSiswa] = useState('')
  const [nisn, setNisn] = useState('')
  const [jurusan, setJurusan] = useState('')
  const [deskripsiBidang, setDeskripsiBidang] = useState('')
  const [ttl, setTtl] = useState('')
  const [notelp, setNotelp] = useState('')
  const [notelpOrtu, setNotelpOrtu] = useState('')
  const [namaOrtu, setNamaOrtu] = useState('')
  const [alamat, setAlamat] = useState('')
  const handleGetUserData = async () => {
    let { data, error } = await supabase.from('User').select().eq('username', username)
    if (error) {
      console.error(error)
    } else {
      console.log(data)
      handleGetSiswaData(data[0].id)
    }
  }
  const handleGetSiswaData = async (userid) => {
    let { data, error } = await supabase.from('DataSiswa').select().eq('userId', userid)
    if (error) {
      console.error(error)
    } else {
      console.log(data)
      setNamaSiswa(data[0].nama_siswa)
      setNisn(data[0].nisn)
      setJurusan(data[0].jurusan)
      setDeskripsiBidang(data[0].deskripsi)
      setAlamat(data[0].alamat)
      setNamaOrtu(data[0].nama_ortu)
      setNotelp(data[0].no_telp)
      setNotelpOrtu(data[0].no_telp_ortu)
      setTtl(data[0].ttl)
    }
  }
  const handleUpdateSiswaData = async (e) => {
    e.preventDefault()
    let { error } = await supabase.from('DataSiswa').update({ nama_siswa: namaSiswa, jurusan: jurusan, deskripsi: deskripsiBidang, ttl: ttl, no_telp: notelp, no_telp_ortu: notelpOrtu, alamat: alamat , nama_ortu: namaOrtu}).eq('nisn', nisn)
    if (error) {
      console.error(error)
      Swal.fire('Error', 'Gagal memperbarui data!', 'error')
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
          <form onSubmit={handleUpdateSiswaData}>
            <div className="form-group">
              <div className="row">
                <div className="col-md-6">
                  <div>
                    <label htmlFor="exampleInputName1">Nama Siswa</label>
                    <input type="text" className="form-control form-control-sm text-left" id="exampleInputName1" value={namaSiswa} onChange={(e) => setNamaSiswa(e.target.value)} required />
                  </div>
                </div>
                <div className="col-md-6">
                  <div>
                    <label htmlFor="exampleInputName2">NISN</label>
                    <input type="text" className="form-control form-control-sm text-left text-left" id="exampleInputName2" value={nisn} onChange={(e) => setNisn(e.target.value)} disabled />
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-md-6">
                  <div>
                    <label htmlFor="exampleInputName1">Jurusan</label>
                    <input type="text" className="form-control form-control-sm text-left" id="exampleInputName1" value={jurusan} onChange={(e) => setJurusan(e.target.value)} required />
                  </div>
                </div>
                <div className="col-md-6">
                  <div>
                    <label htmlFor="exampleInputName2">Deskripsi</label>
                    <input type="text" className="form-control form-control-sm text-left text-left" id="exampleInputName2" value={deskripsiBidang} onChange={(e) => setDeskripsiBidang(e.target.value)} required />
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-md-4">
                  <div>
                    <label htmlFor="tgl">Tanggal Lahir</label>
                    <input type="date" className="form-control form-control-sm text-left" id="tgl" value={ttl} onChange={(e) => setTtl(e.target.value)} required />
                  </div>
                </div>
                <div className="col-md-4">
                  <div>
                    <label htmlFor="telp">Nomer Telepon</label>
                    <input type="tel" className="form-control form-control-sm" name="telp" id="telp" value={notelp} onChange={(e) => setNotelp(e.target.value)} required />
                  </div>
                </div>
                <div className="col-md-4">
                  <div>
                    <label htmlFor="telp">Nomer Telepon Orang Tua</label>
                    <input type="tel" className="form-control form-control-sm" name="telp" id="telp" value={notelpOrtu} onChange={(e) => setNotelpOrtu(e.target.value)} required />
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-md-12">
                  <div>
                    <label htmlFor="alamat">Nama Orang Tua</label>
                    <input type="textarea" className="form-control form-control-sm text-left" value={namaOrtu} onChange={(e) => setNamaOrtu(e.target.value)} required />
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-md-12">
                  <div>
                    <label htmlFor="alamat">Alamat</label>
                    <input type="textarea" className="form-control form-control-sm text-left" id="alamat" value={alamat} onChange={(e) => setAlamat(e.target.value)} required />
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <button type='submit' className="btn btn-primary">Ubah</button>
            </div>
          </form>
        </div>
      </Card>
    </section>
  )
}