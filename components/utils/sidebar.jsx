import Image from "next/image"
import Link from "next/link"
import useLoginStore from "../../store/store"

export default function Sidebar({isActiveNavItem=0, activeUser=''}) {
  const role = useLoginStore((state) => state.role)
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      {/* Brand Logo */}
      <Link href="/admin" className="brand-link">
        <Image src="/dist/img/brand.png" alt="Brand Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} width={128} height={128} />
        <span className="brand-text font-weight-light">Monitoring PKL</span>
      </Link>
      {/* Sidebar */}
      <div className="sidebar">
        {/* Sidebar user panel (optional) */}
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <Image src="/dist/img/user.png" className="img-circle elevation-2" alt="User Image" width={128} height={128} />
          </div>
          <div className="info">
            <Link href={`/profile/${activeUser}`} className="d-block">{activeUser}</Link>
          </div>
        </div>
        {/* Sidebar Menu */}
        <nav className="mt-2">
          <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
            <li className="nav-header" hidden={role == 'admin' ? false : true}>ADMIN</li>
            <li className="nav-item" hidden={role == 'admin' ? false : true}>
              <Link href="/admin" className={`nav-link ${isActiveNavItem == 0 ? ' active':''}`}>
                <i className="nav-icon fas fa-home" />
                <p>
                  Dashboard
                </p>
              </Link>
            </li>
            <li className="nav-item" hidden={role == 'admin' ? false : true}>
              <Link href="/admin/tambahdata" className={`nav-link ${isActiveNavItem == 1 ? ' active':''}`}>
                <i className="nav-icon fas fa-plus" />
                <p>
                  Tambah Data
                </p>
              </Link>
            </li>
            <li className="nav-header" hidden={role == 'guru' || role == 'admin' ? false:true}>GURU</li>
            <li className="nav-item" hidden={role == 'admin' ? false:true}>
              <Link href="/guru" className={`nav-link ${isActiveNavItem == 2 ? ' active':''}`}>
                <i className="nav-icon fas fa-users" />
                <p>
                  Data Guru
                </p>
              </Link>
            </li>
            <li className="nav-item" hidden={role == 'guru' || role == 'admin' ? false:true}>
              <Link href="/guru/activity" className={`nav-link ${isActiveNavItem == 3 ? ' active':''}`}>
                <i className="nav-icon fas fa-clock" />
                <p>
                  Aktivitas Guru
                </p>
              </Link>
            </li>
            <li className="nav-header" hidden={role == 'guru' || role == 'dudi' || role == 'admin' || role == 'siswa' ? false : true}>SISWA</li>
            <li className="nav-item" hidden={role == 'guru' || role == 'dudi' || role == 'admin' ? false : true}>
              <Link href="/siswa" className={`nav-link ${isActiveNavItem == 4 ? ' active':''}`}>
                <i className="nav-icon fas fa-users" />
                <p>
                  Data Siswa
                </p>
              </Link>
            </li>
            <li className="nav-item" hidden={role == 'guru' || role == 'dudi' || role == 'admin' || role == 'siswa' ? false : true}>
              <Link href="/siswa/activity" className={`nav-link ${isActiveNavItem == 5 ? ' active':''}`}>
                <i className="nav-icon fas fa-clock" />
                <p>
                  Aktivitas Siswa
                </p>
              </Link>
            </li>
            <li className="nav-item" hidden={role == 'guru' || role == 'dudi' || role == 'admin' || role == 'siswa' ? false : true}>
              <Link href="/siswa/laporan" className={`nav-link ${isActiveNavItem == 6 ? ' active':''}`}>
                <i className="nav-icon fas fa-upload" />
                <p>
                  Laporan
                </p>
              </Link>
            </li>
            <li className="nav-header" hidden={role == 'admin' ? false : true}>DUDI</li>
            <li className="nav-item" hidden={role == 'admin' ? false : true}>
              <Link href="/dudi" className={`nav-link ${isActiveNavItem == 7 ? ' active':''}`}>
                <i className="nav-icon fas fa-building" />
                <p>
                  Data DUDI
                </p>
              </Link>
            </li>
            <li className="nav-header" hidden={role == 'admin' ? false : true}>Certificate</li>
            <li className="nav-item" hidden={role == 'admin' ? false : true}>
              <Link href="/certificate" className={`nav-link ${isActiveNavItem == 8 ? ' active':''}`}>
                <i className="nav-icon fas fa-building" />
                <p>
                  Cetak Certificate
                </p>
              </Link>
            </li>
          </ul>
        </nav>
        {/* /.sidebar-menu */}
      </div>
      {/* /.sidebar */}
    </aside>

  )
}