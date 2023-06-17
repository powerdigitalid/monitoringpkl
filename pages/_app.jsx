import '../public/dist/css/adminlte.min.css'
import '../public/dist/css/custom.css'
import '../public/plugins/fontawesome-free/css/all.min.css'
import '../public/plugins/overlayScrollbars/css/OverlayScrollbars.min.css'
import '../public/plugins/icheck-bootstrap/icheck-bootstrap.min.css'
import { Source_Sans_Pro } from '@next/font/google'

const SourceSansPro = Source_Sans_Pro({
  weight: ['300', '400', '700']
});

function MyApp({ Component, pageProps }) {
  return (
    <main className={SourceSansPro.className}>
      <Component {...pageProps} />
    </main>
  )
}

export default MyApp
