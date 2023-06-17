import { useState } from "react";
import Swal from "sweetalert2";
import { supabase } from "../../libs/supabase.lib";
import Card from "../utils/card";

export default function Template() {
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
      <div className="container pm-certificate-container">
        <div className="outer-border" />
        <div className="inner-border" />
        <div className="pm-certificate-border">
          <div className="row pm-certificate-header text-center">
            <div className="pm-certificate-title cursive">
              <h2 style={{marginLeft: "180px"}}>Sertifikat Pelaksanaan PKL</h2>
            </div>
          </div>
          <div className="row pm-certificate-body">
            <div className="pm-certificate-block">
              <div className="col-xs-12">
                <div className="row">
                  <div className="col-xs-2">{/* LEAVE EMPTY */}</div>
                  <div className="pm-certificate-name underline margin-0 col-xs-8 text-center" style={{marginLeft: "180px"}}>
                    <span className="pm-name-text bold">
                      TrueNorth Administrator
                    </span>
                  </div>
                  <div className="col-xs-2">{/* LEAVE EMPTY */}</div>
                </div>
              </div>
              <div className="col-xs-12">
                <div className="row">
                  <div className="col-xs-2">{/* LEAVE EMPTY */}</div>
                  <div className="pm-earned col-xs-8 text-center" style={{marginLeft: "130px"}}>
                    <span className="pm-credits-text block bold sans">
                      Melaksanakan Kegiatan Praktek Kerja lapangan Di
                    </span>
                  </div>
                  <div className="col-xs-2">{/* LEAVE EMPTY */}</div>
                  <div className="col-xs-12" />
                </div>
              </div>
              <div className="col-xs-12">
                <div className="row">
                  <div className="col-xs-2">{/* LEAVE EMPTY */}</div>
                  <div className="pm-course-title underline col-xs-8 text-center" style={{marginLeft: "170px"}}>
                    <span className="pm-credits-text block bold sans">
                      SMK MUHAMMADIYAH 6 ROGOJAMPI
                    </span>
                  </div>
                  <div className="col-xs-2">{/* LEAVE EMPTY */}</div>
                </div>
              </div>
              <div className="col-xs-12">
                <div className="row" style={{marginTop: "70px", marginLeft: "20px"}}>
                  <div className="col-xs-2">{/* LEAVE EMPTY */}</div>
                  <div className="col-xs-4 pm-certified col-xs-4 text-center">
                    <span className="pm-credits-text block sans">
                      Kaprodi
                    </span>
                    <span className="pm-empty-space block underline" />
                    <span className="bold block">
                      Bambang Sulastri
                    </span>
                  </div>
                  <div className="col-xs-2">{/* LEAVE EMPTY */}</div>
                </div>
              </div>
              <div className="col-xs-12">
                <div className="row" style={{marginTop: "-81px", marginLeft: "520px"}}>
                  <div className="col-xs-2">{/* LEAVE EMPTY */}</div>
                  <div className="col-xs-4 pm-certified col-xs-4 text-center">
                    <span className="pm-credits-text block sans">
                      Kepala Sekolah
                    </span>
                    <span className="pm-empty-space block underline" />
                    <span className="bold block">
                      Budi Kartini
                    </span>
                  </div>
                  <div className="col-xs-2">{/* LEAVE EMPTY */}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
