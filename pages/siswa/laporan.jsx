import Laporan from "../../components/siswa/Laporan";
import ContentHeader from "../../components/utils/content-header";
import Layout from "../../components/utils/layout";
import useLoginStore from "../../store/store";

export default function LaporanSiswa(){
  const user = useLoginStore((state) => state.user)
  const breadcrumbs = [
    {
      isActive: false,
      text: 'Siswa',
      url: '#'
    },
    {
      isActive: true,
      text: 'Laporan',
      url: '#'
    },
  ]
  return (
    <Layout title="Laporan - Monitoring PKL" activeNavBarItem={6} activeUser={user}>
      <ContentHeader title={'Laporan'} listBreadcrumb={breadcrumbs} />
      <Laporan />
    </Layout>
  )
}