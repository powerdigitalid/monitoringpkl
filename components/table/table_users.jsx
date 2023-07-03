import { useEffect, useState } from "react"
import { supabase } from '../../libs/supabase.lib'

export default function TableUsers() {
  const [userdata, setUserData] = useState([])
  const [search, setSearch] = useState('')
  const searchedData = userdata.filter((user) => user.username.toLowerCase().includes(search.toLowerCase()))
  const fetchUser = async () => {
    let { data, error } = await supabase.from('User').select()
    if (error) {
      console.error(error)
    } else {
      setUserData(data)
    }
  }
  useEffect(() => {
    const interval = setInterval(fetchUser, 5000); 
    return () => {
      clearInterval(interval);
    };
    // fetchUser()
  }, [])
  console.log(userdata)
  return (
    <div className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Tabel Users</h3>
                <div className="card-tools">
                  <div className="input-group input-group-sm" style={{ width: 150 }}>
                    <input type="text" name="table_search" className="form-control float-right" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)}/>
                    <div className="input-group-append">
                      <button type="submit" className="btn btn-default">
                        <i className="fas fa-search" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* /.card-header */}
              <div className="card-body table-responsive p-0">
                <table className="table table-hover text-nowrap">
                  <thead>
                    <tr>
                      <th>NIP / NISN / Username</th>
                      <th>Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchedData.map((user, i) => (
                      <tr key={i}>
                        <td>{user.username}</td>
                        <td>{user.role}</td>
                      </tr>
                    ))}

                  </tbody>
                </table>
              </div>
              {/* /.card-body */}
            </div>
            {/* /.card */}
          </div>
        </div>
      </div>
    </div>
  )
}