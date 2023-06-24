import { useState } from "react";
import Swal from "sweetalert2";
import { supabase } from "../../libs/supabase.lib";
import Card from "../utils/card";
import React from 'react';
import { useReactToPrint } from 'react-to-print';

export default function Template() {
  const [namaSiswa, setNamaSiswa] = useState("");
  const [namaSekolah, setNamaSekolah] = useState("");
  const [namaKaprok, setNamaKaprok] = useState("");
  const [namaKepalaSekolah, setNamaKepalaSekolah] = useState("");

  const componentRef = React.useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleNamaSiswaChange = (event) => {
    setNamaSiswa(event.target.value);
  };

  const handleNamaSekolahChange = (event) => {
    setNamaSekolah(event.target.value);
  };

  const handleNamaKaprokChange = (event) => {
    setNamaKaprok(event.target.value);
  };

  const handleNamaKepalaSekolahChange = (event) => {
    setNamaKepalaSekolah(event.target.value);
  };

  const handleCreateLog = async (e) => {
    e.preventDefault();

    try {
      // Lakukan validasi input sesuai kebutuhan
      if (namaSiswa === "") {
        throw new Error("Nama Siswa harus diisi");
      }
      if (namaSekolah === "") {
        throw new Error("Nama Sekolah harus diisi");
      }
      if (namaKaprok === "") {
        throw new Error("Nama Kaprok harus diisi");
      }
      if (namaKepalaSekolah === "") {
        throw new Error("Nama Kepala Sekolah harus diisi");
      }
      setNamaSiswa("");
      setNamaSekolah("");
      setNamaKaprok("");
      setNamaKepalaSekolah("");
    } catch (error) {
      // Tangani error jika ada kesalahan dalam input atau proses manipulasi sertifikat
      Swal.fire("Error", error.message, "error");
    }
  };



  return (
    <div className="container-fluid">
      <Card cardTitle="Edit Certificate" cardIcon="fa-edit">
        <form>
          <div className="form-group">
            <div className="row">
              <div className="col-md-6">
                <div>
                  <label htmlFor="exampleInputName1">Nama Siswa</label>
                  <input type="text" className="form-control form-control-sm text-left" id="exampleInputName1" 
                  value={namaSiswa}
                  onChange={handleNamaSiswaChange}
                    required />
                </div>
              </div>
              <div className="col-md-6">
                <div>
                  <label htmlFor="exampleInputName2">Nama Sekolah</label>
                  <input type="text" className="form-control form-control-sm text-left text-left" id="exampleInputName2"  required 
                  value={namaSekolah}
                  onChange={handleNamaSekolahChange}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div>
                  <label htmlFor="exampleInputName1">Nama Kaprok</label>
                  <input type="text" className="form-control form-control-sm text-left" id="exampleInputName1"  required 
                  value={namaKaprok}
                  onChange={handleNamaKaprokChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div>
                  <label htmlFor="exampleInputName2">Nama Kepala Sekolah</label>
                  <input type="text" className="form-control form-control-sm text-left text-left" id="exampleInputName2"  required 
                  value={namaKepalaSekolah}
                  onChange={handleNamaKepalaSekolahChange}
                  />
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col">
                <button className="btn btn-success" onClick={handlePrint}><i className="fas fa-arrow-down"></i> Cetak Certificate</button>
              </div>
            </div>
          </div>
        </form>
      </Card>
      <div className="container pm-certificate-container" ref={componentRef}>
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
                      {namaSiswa}
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
                      {namaSekolah}
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
                      {namaKaprok}
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
                      {namaKepalaSekolah}
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
