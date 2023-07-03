import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { supabase } from "../../libs/supabase.lib";
import Card from "../utils/card";
import useLoginStore from "../../store/store";

export default function Upload() {
  const user = useLoginStore((state) => state.user);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("Upload");
  const [fileName, setFileName] = useState("");
  const [dataSiswa, setDataSiswa] = useState([]);
  const [laporan, setLaporan] = useState([]);
  // const [kegiatan, setKegiatan] = useState("");

  const handleGetUserData = async () => {
    let { data, error } = await supabase.from('User').select().eq('username', user)
    if (error) {
      console.error(error)
    } else {
      console.log(data);
      handleGetSiswaData(data[0].id)
    }
  }

  const handleGetSiswaData = async (userid) => {
    let { data, error } = await supabase.from('DataSiswa').select().eq('userId', userid)
    if (error) {
      console.error(error)
    } else {
      console.log(data)
      setDataSiswa(data)
    }
  }

  const uploadFile = async (event) => {
    try {
      setIsUploading(true);
      setUploadMessage("Uploading...");
      if (!event.target.files || event.target.files.length == 0) {
        throw new Error("Anda harus memilih satu gambar untuk diunggah!");
      }
      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-username.${fileExt}`;
      const filePath = `${fileName}`;
      setFileName(filePath);
      let { error: uploadError } = await supabase.storage
        .from("file-laporan")
        .upload(filePath, file, { upsert: true });
      if (uploadError) throw uploadError;
      setUploadMessage("Upload completed!");
    } catch (error) {
      Swal.fire("Error", "Error while uploading image file!", "error");
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleUploadFile = async (e) => {
    try {
      e.preventDefault();
      if (fileName == '') throw new Error('Anda harus memilih satu gambar untuk diunggah!');
      const newFile = {
        nama: dataSiswa[0].nama_siswa,
        SiswaId: dataSiswa[0].nisn,
        createdAt: new Date(Date.now()).toISOString(),
        file: fileName
      }
      let { data, error } = await supabase.from('Laporan').insert(newFile).select()
      if (error) {
        console.error(error)
      } else {
        Swal.fire('Success', 'File berhasil ditambahkan!', 'info')
        setFileName('')
        setUploadMessage('Upload')
        e.target.files = []
        console.info(data)
      }
    } catch (error) {
      Swal.fire('Error', 'Anda harus memilih satu gambar untuk diunggah!', 'error')
    }
  }

  const fetchLaporan = async () => {
    let { data, error } = await supabase.from('Laporan').select('*')
    if (error) {
      console.error(error)
    } else {
      setLaporan(data)
    }
  }

  const handleDeleteFile = async (id) => {
    let { error } = await supabase.from('Laporan').delete().eq('id', id)
    if (error) {
      console.error(error)
      Swal.fire('Error', 'Gagal Menghapus', 'error')
    } else {
      Swal.fire('Success', 'Data Terhapus', 'success')
    }
  }

  useEffect(() => {
    handleGetUserData()
  }, [])

  useEffect(() => {
    fetchLaporan()
  }, [laporan])
  // const handleCreateLog = async (e) => {
  //   try {
  //     e.preventDefault();
  //     if (fileName == "")
  //       throw new Error("Anda harus memilih satu gambar untuk diunggah!");
  //     const newLog = {
  //       nama: "guru",
  //       kegiatan: kegiatan,
  //       createdAt: new Date(Date.now()).toISOString(),
  //       image: fileName,
  //     };
  //     let { data, error } = await supabase
  //       .from("LogGuru")
  //       .insert(newLog)
  //       .select();
  //     if (error) {
  //       console.error(error);
  //     } else {
  //       Swal.fire("Success", "Log berhasil ditambahkan!", "info");
  //       setFileName("");
  //       setUploadMessage("Upload");
  //       e.target.files = [];
  //       console.info(data);
  //     }
  //   } catch (error) {
  //     Swal.fire(
  //       "Error",
  //       "Anda harus memilih satu gambar untuk diunggah!",
  //       "error"
  //     );
  //   }
  // };
  return (
    <div className="container-fluid">
      <Card cardTitle="Upload Laporan" cardIcon="fa-upload">
        <form onSubmit={handleUploadFile}>
          <div className="form-group">
            <label htmlFor="exampleInputFile">Pilih File</label>
            <div className="input-group">
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  accept="pdf/*"
                  onChange={uploadFile}
                  disabled={isUploading}
                />
                <label className="custom-file-label" htmlFor="exampleInputFile">
                  {fileName == "" ? "Choose file" : fileName}
                </label>
              </div>
              <div className="input-group-append">
                <span className="input-group-text">{uploadMessage}</span>
              </div>
            </div>
          </div>
          {/* /.card-body */}
          <div className="card-footer">
            <button type="submit" className="btn btn-primary">
              <i className="fas fa-upload" /> Upload
            </button>
          </div>
        </form>
      </Card>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Tabel File Laporan</h3>
            </div>
            {/* /.card-header */}
            <div className="card-body table-responsive p-0">
              <table className="table table-hover text-nowrap">
                <thead className="">
                  <tr>
                    <th style={{ width: "20px" }}>No</th>
                    <th>Nama Siswa</th>
                    <th>Nama File</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    laporan.map((siswa, i) => (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{siswa.nama}</td>
                        <td>{siswa.file}<a href={`https://xuiabtqtmfhgdqyrppex.supabase.co/storage/v1/object/public/file-laporan/${siswa.file}`}> [ download ]</a></td>
                        <td><a type="button" onClick={() => handleDeleteFile(siswa.id)} className="btn btn-danger"><i className="fas fa-trash" /></a></td>
                      </tr>
                    ))
                  }

                </tbody>
              </table>
            </div>
            {/* /.card-body */}
          </div>
          {/* /.card */}
        </div>
      </div>
    </div>
  );
}
