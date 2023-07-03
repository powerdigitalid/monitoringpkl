import { useEffect, useState } from "react"
import { supabase } from "../../libs/supabase.lib"
import useLoginStore from "../../store/store"
import Swal from "sweetalert2"
import Card from "../utils/card"

export default function EditActivity() {
  const user = useLoginStore((state) => state.user)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadMessage, setUploadMessage] = useState('Upload')
  const [fileName, setFileName] = useState('')
  const [kegiatan, setKegiatan] = useState('')
  const [dataSiswa, setDataSiswa] = useState([])
  const handleGetUserData = async () => {
    let { data, error } = await supabase.from('User').select().eq('username', user)
    if (error) {
      console.error(error)
    } else {
      console.log(data)
      handleGetSiswaData(data[0].id)
    }
  }
  const handleGetSiswaData = async (userid) => {
    let {data, error} = await supabase.from('DataSiswa').select().eq('userId', userid)
    if (error) {
      console.error(error)
    } else {
      console.log(data)
      setDataSiswa(data)
    }
  }
  const uploadImage = async (event) => {
    try {
      setIsUploading(true)
      setUploadMessage('Uploading...')
      if (!event.target.files || event.target.files.length == 0) {
        throw new Error('Anda harus memilih satu gambar untuk diunggah!')
      }
      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-username.${fileExt}`
      const filePath = `${fileName}`
      setFileName(filePath)
      let { error: uploadError } = await supabase.storage.from('log-siswa-images').upload(filePath, file, { upsert: true })
      if (uploadError) throw uploadError
      setUploadMessage('Upload completed!')
    } catch (error) {
      Swal.fire('Error', 'Error while uploading image file!', 'error')
      console.error(error)
    } finally {
      setIsUploading(false)
    }
  }
  const handleCreateLog = async (e) => {
    try {
      e.preventDefault()
      if (fileName == '') throw new Error('Anda harus memilih satu gambar untuk diunggah!')
      const newLog = {
        nama: dataSiswa[0].nama_siswa,
        kegiatan: kegiatan,
        dudiId: dataSiswa[0].DudiId,
        guruId: dataSiswa[0].GuruId,
        createdAt: new Date(Date.now()).toISOString(),
        image: fileName
      }
      let { data, error } = await supabase.from('LogSiswa').insert(newLog).select()
      if (error) {
        console.error(error)
      } else {
        Swal.fire('Success', 'Log berhasil ditambahkan!', 'info')
        setFileName('')
        setUploadMessage('Upload')
        e.target.files = []
        console.info(data)
      }
    } catch (error) {
      Swal.fire('Error', 'Anda harus memilih satu gambar untuk diunggah!', 'error')
    }

  }
  useEffect(() => {
    handleGetUserData()
  }, [])
  return (
    <Card cardTitle="Aktivitas Baru" cardIcon="fa-clock">
      <form onSubmit={handleCreateLog}>
        <div className="form-group">
          <label>Kegiatan</label>
          <textarea className="form-control" rows="3" placeholder="Enter ..." value={kegiatan} onChange={(e) => setKegiatan(e.target.value)} required></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputFile">Pilih File</label>
          <div className="input-group">
            <div className="custom-file">
              <input type="file" className="custom-file-input" accept="image/*" onChange={uploadImage} disabled={isUploading} />
              <label className="custom-file-label" htmlFor="exampleInputFile">{fileName == '' ? 'Choose file' : fileName}</label>
            </div>
            <div className="input-group-append">
              <span className="input-group-text">{uploadMessage}</span>
            </div>
          </div>
        </div>
        {/* /.card-body */}
        <div className="card-footer">
          <button type="submit" className="btn btn-primary">
            <i className="fas fa-upload" /> Upload</button>
        </div>
      </form >
    </Card>
  )
}