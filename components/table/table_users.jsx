export default function TableUsers() {
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
                                        <input type="text" name="table_search" className="form-control float-right" placeholder="Search" />
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
                                            <th>NIP / NISN</th>
                                            <th>Nama</th>
                                            <th>Role</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>183</td>
                                            <td>John Doe</td>
                                            <td>11-7-2014</td>
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
        </div>
    )
}