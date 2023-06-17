import { useState } from "react";
import Swal from "sweetalert2";
import { supabase } from "../../libs/supabase.lib";
import Card from "../utils/card";

export default function Upload() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("Upload");
  const [fileName, setFileName] = useState("");
  const [kegiatan, setKegiatan] = useState("");
  const uploadImage = async (event) => {
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
        .from("log-guru-images")
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
  const handleCreateLog = async (e) => {
    try {
      e.preventDefault();
      if (fileName == "")
        throw new Error("Anda harus memilih satu gambar untuk diunggah!");
      const newLog = {
        nama: "guru",
        kegiatan: kegiatan,
        createdAt: new Date(Date.now()).toISOString(),
        image: fileName,
      };
      let { data, error } = await supabase
        .from("LogGuru")
        .insert(newLog)
        .select();
      if (error) {
        console.error(error);
      } else {
        Swal.fire("Success", "Log berhasil ditambahkan!", "info");
        setFileName("");
        setUploadMessage("Upload");
        e.target.files = [];
        console.info(data);
      }
    } catch (error) {
      Swal.fire(
        "Error",
        "Anda harus memilih satu gambar untuk diunggah!",
        "error"
      );
    }
  };
  return (
    <div className="container-fluid">
      <Card cardTitle="Upload Laporan" cardIcon="fa-upload">
        <form onSubmit={handleCreateLog}>
          <div className="form-group">
            <label htmlFor="exampleInputFile">Pilih File</label>
            <div className="input-group">
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  accept="pdf/*"
                  onChange={uploadImage}
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
                      <th style={{width: "20px"}}>No</th>
                      <th>Nama File</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                      <tr >
                        <td>1</td>
                        <td>tes.pdf <a href="#"> [ download ]</a></td>
                        <td><a type="button" className="btn btn-danger"><i className="fas fa-trash" /></a></td>
                      </tr>
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
