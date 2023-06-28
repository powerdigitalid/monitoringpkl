-- CreateTable
CREATE TABLE "Laporan" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "file" TEXT,
    "SiswaId" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Laporan_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Laporan" ADD CONSTRAINT "Laporan_SiswaId_fkey" FOREIGN KEY ("SiswaId") REFERENCES "DataSiswa"("nisn") ON DELETE RESTRICT ON UPDATE CASCADE;
