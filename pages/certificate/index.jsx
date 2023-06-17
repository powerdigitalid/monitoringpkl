import { useRouter } from "next/router";
import { useEffect } from "react";
import Certificate from "../../components/certificate/template";
import ContentHeader from "../../components/utils/content-header";
import Layout from "../../components/utils/layout";
import useLoginStore from "../../store/store";

export default function CertificatePages(){
  const router = useRouter()
  const user = useLoginStore((state) => state.user)
  const role = useLoginStore((state) => state.role)
  useEffect(() =>{
    if (user === '' && role ==='') router.push('/login')
  })
  const breadcrumbs = [
    {
      isActive: false,
      text: 'Certificate',
      url: '#'
    },
    {
      isActive: true,
      text: 'Cetak',
      url: '#'
    },
  ]
  return (
    <Layout title="Certificate" activeNavBarItem={8} activeUser={user}>
      <ContentHeader title={'Certificate'} listBreadcrumb={breadcrumbs} />
      <Certificate />
    </Layout>
  )
}