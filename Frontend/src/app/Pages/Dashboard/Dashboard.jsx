import React from 'react'

const Dashboard = () => {
  return (
    <>
      <section className="content">
  <div className="container-fluid">
    <div className="block-header">
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <ul className="breadcrumb breadcrumb-style ">
            <li className="breadcrumb-item">
              <h4 className="page-title">Dashboard</h4>
            </li>
            <li className="breadcrumb-item bcrumb-1">
              <a href="index.html">
                <i className="fas fa-home" /> Home</a>
            </li>
            <li className="breadcrumb-item active">Dashboard</li>
          </ul>
        </div>
      </div>
    </div>
    <div className="row ">
      <div className="col-xl-3 col-sm-6">
        <div className="card l-bg-purple">
          <div className="info-box-5 p-4">
            <div className="card-icon card-icon-large"><i className="far fa-window-restore" /></div>
            <div className="mb-4">
              <h5 className="font-20 mb-0">Projects</h5>
            </div>
            <div className="row align-items-center mb-2 d-flex">
              <div className="col-8">
                <h2 className="d-flex align-items-center mb-0">
                  125
                </h2>
              </div>
              <div className="col-4 text-end">
                <span className="fw-bold">24.7% <i className="fa fa-arrow-up" /></span>
              </div>
            </div>
            <div className="progress mt-1 " data-height={8} style={{height: 8}}>
              <div className="progress-bar l-bg-cyan" role="progressbar" data-width="25%" aria-valuenow={25} aria-valuemin={0} aria-valuemax={100} style={{width: '25%'}}>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-3 col-lg-6">
        <div className="card l-bg-blue-dark">
          <div className="info-box-5 p-4">
            <div className="card-icon card-icon-large"><i className="fas fa-users" /></div>
            <div className="mb-4">
              <h5 className="font-20 mb-0">New Employee</h5>
            </div>
            <div className="row align-items-center mb-2 d-flex">
              <div className="col-8">
                <h2 className="d-flex align-items-center mb-0">
                  213
                </h2>
              </div>
              <div className="col-4 text-end">
                <span>5.28% <i className="fa fa-arrow-up" /></span>
              </div>
            </div>
            <div className="progress mt-1 " data-height={8} style={{height:8}}>
              <div className="progress-bar l-bg-green" role="progressbar" data-width="25%" aria-valuenow={25} aria-valuemin={0} aria-valuemax={100} style={{width: '25%'}}>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-3 col-lg-6">
        <div className="card l-bg-green-dark">
          <div className="info-box-5 p-4">
            <div className="card-icon card-icon-large"><i className="fas fa-tasks" /></div>
            <div className="mb-4">
              <h5 className="font-20 mb-0">Running Tasks</h5>
            </div>
            <div className="row align-items-center mb-2 d-flex">
              <div className="col-8">
                <h2 className="d-flex align-items-center mb-0">
                  10,225
                </h2>
              </div>
              <div className="col-4 text-end">
                <span>16% <i className="fa fa-arrow-up" /></span>
              </div>
            </div>
            <div className="progress mt-1 " data-height={8} style={{height: 8}}>
              <div className="progress-bar l-bg-orange" role="progressbar" data-width="25%" aria-valuenow={25} aria-valuemin={0} aria-valuemax={100} style={{width: '25%'}}>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-3 col-lg-6">
        <div className="card l-bg-orange-dark">
          <div className="info-box-5 p-4">
            <div className="card-icon card-icon-large"><i className="fas fa-money-check-alt" /></div>
            <div className="mb-4">
              <h5 className="font-20 mb-0">Earning</h5>
            </div>
            <div className="row align-items-center mb-2 d-flex">
              <div className="col-8">
                <h2 className="d-flex align-items-center mb-0">
                  $2,658
                </h2>
              </div>
              <div className="col-4 text-end">
                <span>5.07% <i className="fa fa-arrow-up" /></span>
              </div>
            </div>
            <div className="progress mt-1 " data-height={8} style={{height: 8}}>
              <div className="progress-bar l-bg-cyan" role="progressbar" data-width="25%" aria-valuenow={25} aria-valuemin={0} aria-valuemax={100} style={{width: '25%'}}>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-lg-6">
        <div className="card">
          <div className="header">
            <h2>
              <strong>Products</strong> Chart</h2>
          </div>
          <div className="body">
            <div className="recent-report__chart">
              <div id="chart1" />
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="card">
          <div className="header">
            <h2>
              <strong>Profit</strong> Chart</h2>
          </div>
          <div className="body">
            <div className="recent-report__chart">
              <div id="chart2" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="row clearfix">
      {/* Task Info */}
      <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8">
        <div className="card">
          <div className="header">
            <h2>
              <strong>Project</strong> Details</h2>
            <ul className="header-dropdown m-r--5">
              <li className="dropdown">
                <a href="#" onclick="return false;" className="dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                  <i className="material-icons">more_vert</i>
                </a>
                <ul className="dropdown-menu pull-right">
                  <li>
                    <a href="#" onclick="return false;">Action</a>
                  </li>
                  <li>
                    <a href="#" onclick="return false;">Another action</a>
                  </li>
                  <li>
                    <a href="#" onclick="return false;">Something else here</a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="body">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Project</th>
                    <th>Team</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Project A</td>
                    <td className="text-truncate">
                      <ul className="list-unstyled order-list">
                        <li className="avatar avatar-sm"><img className="rounded-circle" src="assets/images/user/user1.jpg" alt="user" />
                        </li>
                        <li className="avatar avatar-sm"><img className="rounded-circle" src="assets/images/user/user2.jpg" alt="user" />
                        </li>
                        <li className="avatar avatar-sm"><img className="rounded-circle" src="assets/images/user/user3.jpg" alt="user" />
                        </li>
                        <li className="avatar avatar-sm"><span className="badge">+4</span>
                        </li>
                      </ul>
                    </td>
                    <td><span className="badge col-orange">High</span></td>
                    <td>
                      <div className="progress-xs not-rounded progress shadow-style">
                        <div className="progress-bar progress-bar-danger width-per-40" role="progressbar" aria-valuenow={40} aria-valuemin={0} aria-valuemax={100}>
                          <span className="sr-only">40%</span>
                        </div>
                      </div>
                    </td>
                    <td>$150.00</td>
                  </tr>
                  <tr>
                    <td>Project B</td>
                    <td className="text-truncate">
                      <ul className="list-unstyled order-list">
                        <li className="avatar avatar-sm"><img className="rounded-circle" src="assets/images/user/user4.jpg" alt="user" />
                        </li>
                        <li className="avatar avatar-sm"><img className="rounded-circle" src="assets/images/user/user5.jpg" alt="user" />
                        </li>
                        <li className="avatar avatar-sm"><span className="badge">+3</span>
                        </li>
                      </ul>
                    </td>
                    <td><span className="badge col-cyan">Medium</span></td>
                    <td>
                      <div className="progress-xs not-rounded progress shadow-style">
                        <div className="progress-bar progress-bar-lightred width-per-60" role="progressbar" aria-valuenow={60} aria-valuemin={0} aria-valuemax={100}>
                          <span className="sr-only">60%</span>
                        </div>
                      </div>
                    </td>
                    <td>$470.00</td>
                  </tr>
                  <tr>
                    <td>Project C</td>
                    <td className="text-truncate">
                      <ul className="list-unstyled order-list">
                        <li className="avatar avatar-sm"><img className="rounded-circle" src="assets/images/user/user1.jpg" alt="user" />
                        </li>
                        <li className="avatar avatar-sm"><img className="rounded-circle" src="assets/images/user/user2.jpg" alt="user" />
                        </li>
                        <li className="avatar avatar-sm"><img className="rounded-circle" src="assets/images/user/user3.jpg" alt="user" />
                        </li>
                        <li className="avatar avatar-sm"><span className="badge">+4</span>
                        </li>
                      </ul>
                    </td>
                    <td><span className="badge col-orange">High</span></td>
                    <td>
                      <div className="progress-xs not-rounded progress shadow-style">
                        <div className="progress-bar progress-bar-warning width-per-40" role="progressbar" aria-valuenow={40} aria-valuemin={0} aria-valuemax={100}>
                          <span className="sr-only">40%</span>
                        </div>
                      </div>
                    </td>
                    <td>$564.00</td>
                  </tr>
                  <tr>
                    <td>Project D</td>
                    <td className="text-truncate">
                      <ul className="list-unstyled order-list">
                        <li className="avatar avatar-sm"><img className="rounded-circle" src="assets/images/user/user6.jpg" alt="user" />
                        </li>
                        <li className="avatar avatar-sm"><img className="rounded-circle" src="assets/images/user/user7.jpg" alt="user" />
                        </li>
                        <li className="avatar avatar-sm"><img className="rounded-circle" src="assets/images/user/user8.jpg" alt="user" />
                        </li>
                        <li className="avatar avatar-sm"><span className="badge">+4</span>
                        </li>
                      </ul>
                    </td>
                    <td><span className="badge col-green">Low</span></td>
                    <td>
                      <div className="progress-xs not-rounded progress shadow-style">
                        <div className="progress-bar progress-bar-success width-per-45" role="progressbar" aria-valuenow={45} aria-valuemin={0} aria-valuemax={100}>
                          <span className="sr-only">45%</span>
                        </div>
                      </div>
                    </td>
                    <td>$925.00</td>
                  </tr>
                  <tr>
                    <td>Project E</td>
                    <td className="text-truncate">
                      <ul className="list-unstyled order-list">
                        <li className="avatar avatar-sm"><img className="rounded-circle" src="assets/images/user/user8.jpg" alt="user" />
                        </li>
                        <li className="avatar avatar-sm"><img className="rounded-circle" src="assets/images/user/user9.jpg" alt="user" />
                        </li>
                        <li className="avatar avatar-sm"><span className="badge">+1</span>
                        </li>
                      </ul>
                    </td>
                    <td><span className="badge col-cyan">Medium</span></td>
                    <td>
                      <div className="progress-xs not-rounded progress shadow-style">
                        <div className="progress-bar progress-bar-lightred width-per-80" role="progressbar" aria-valuenow={80} aria-valuemin={0} aria-valuemax={100}>
                          <span className="sr-only">80%</span>
                        </div>
                      </div>
                    </td>
                    <td>$785.00</td>
                  </tr>
                  <tr>
                    <td>Project G</td>
                    <td className="text-truncate">
                      <ul className="list-unstyled order-list">
                        <li className="avatar avatar-sm"><img className="rounded-circle" src="assets/images/user/user1.jpg" alt="user" />
                        </li>
                        <li className="avatar avatar-sm"><img className="rounded-circle" src="assets/images/user/user6.jpg" alt="user" />
                        </li>
                        <li className="avatar avatar-sm"><img className="rounded-circle" src="assets/images/user/user8.jpg" alt="user" />
                        </li>
                        <li className="avatar avatar-sm"><span className="badge">+3</span>
                        </li>
                      </ul>
                    </td>
                    <td><span className="badge col-green">Low</span></td>
                    <td>
                      <div className="progress-xs not-rounded progress shadow-style">
                        <div className="progress-bar progress-bar-success width-per-40" role="progressbar" aria-valuenow={40} aria-valuemin={0} aria-valuemax={100}>
                          <span className="sr-only">40%</span>
                        </div>
                      </div>
                    </td>
                    <td>$270.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* #END# Task Info */}
      {/* Browser Usage */}
      <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
        <div className="card">
          <div className="header">
            <h2>
              <strong>TODO </strong>List</h2>
            <ul className="header-dropdown m-r--5">
              <li className="dropdown">
                <a href="#" onclick="return false;" className="dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                  <i className="material-icons">more_vert</i>
                </a>
                <ul className="dropdown-menu pull-right">
                  <li>
                    <a href="#" onclick="return false;">Action</a>
                  </li>
                  <li>
                    <a href="#" onclick="return false;">Another action</a>
                  </li>
                  <li>
                    <a href="#" onclick="return false;">Something else here</a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="body">
            <div className="tdl-content">
              <ul className="to-do-list ui-sortable">
                <li className="clearfix">
                  <div className="form-check m-l-10">
                    <label className="form-check-label"> <input className="form-check-input" type="checkbox" defaultValue />
                      Add salary details in system <span className="form-check-sign"> <span className="check" />
                      </span>
                    </label>
                  </div>
                  <div className="todo-actionlist pull-right clearfix">
                    <a href="#"> <i className="material-icons">clear</i>
                    </a>
                  </div>
                </li>
                <li className="clearfix">
                  <div className="form-check m-l-10">
                    <label className="form-check-label"> <input className="form-check-input" type="checkbox" defaultValue />
                      Announcement for holiday <span className="form-check-sign"> <span className="check" />
                      </span>
                    </label>
                  </div>
                  <div className="todo-actionlist pull-right clearfix">
                    <a href="#"> <i className="material-icons">clear</i>
                    </a>
                  </div>
                </li>
                <li className="clearfix">
                  <div className="form-check m-l-10">
                    <label className="form-check-label"> <input className="form-check-input" type="checkbox" defaultValue />
                      call bus driver <span className="form-check-sign"> <span className="check" />
                      </span>
                    </label>
                  </div>
                  <div className="todo-actionlist pull-right clearfix">
                    <a href="#"> <i className="material-icons">clear</i>
                    </a>
                  </div>
                </li>
                <li className="clearfix">
                  <div className="form-check m-l-10">
                    <label className="form-check-label"> <input className="form-check-input" type="checkbox" defaultValue />
                      Office Picnic <span className="form-check-sign"> <span className="check" />
                      </span>
                    </label>
                  </div>
                  <div className="todo-actionlist pull-right clearfix">
                    <a href="#"> <i className="material-icons">clear</i>
                    </a>
                  </div>
                </li>
                <li className="clearfix">
                  <div className="form-check m-l-10">
                    <label className="form-check-label"> <input className="form-check-input" type="checkbox" defaultValue />
                      Website Must Be Finished <span className="form-check-sign"> <span className="check" />
                      </span>
                    </label>
                  </div>
                  <div className="todo-actionlist pull-right clearfix">
                    <a href="#"> <i className="material-icons">clear</i>
                    </a>
                  </div>
                </li>
                <li className="clearfix">
                  <div className="form-check m-l-10">
                    <label className="form-check-label"> <input className="form-check-input" type="checkbox" defaultValue />
                      Recharge My Mobile <span className="form-check-sign"> <span className="check" />
                      </span>
                    </label>
                  </div>
                  <div className="todo-actionlist pull-right clearfix">
                    <a href="#"> <i className="material-icons">clear</i>
                    </a>
                  </div>
                </li>
                <li className="clearfix">
                  <div className="form-check m-l-10">
                    <label className="form-check-label"> <input className="form-check-input" type="checkbox" defaultValue />
                      Add salary details in system <span className="form-check-sign"> <span className="check" />
                      </span>
                    </label>
                  </div>
                  <div className="todo-actionlist pull-right clearfix">
                    <a href="#"> <i className="material-icons">clear</i>
                    </a>
                  </div>
                </li>
              </ul>
            </div>
            <input type="text" className="tdl-new form-control-radious" placeholder="Enter Todo..." />
          </div>
        </div>
      </div>
      {/* #END# Browser Usage */}
    </div>
    <div className="row">
      <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
        <div className="card">
          <div className="header">
            <h2>Chart 1</h2>
            <ul className="header-dropdown m-r--5">
              <li className="dropdown">
                <a href="#" onclick="return false;" className="dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                  <i className="material-icons">more_vert</i>
                </a>
                <ul className="dropdown-menu pull-right">
                  <li>
                    <a href="#" onclick="return false;">Action</a>
                  </li>
                  <li>
                    <a href="#" onclick="return false;">Another action</a>
                  </li>
                  <li>
                    <a href="#" onclick="return false;">Something else here</a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="body">
            <div id="echart_graph_line" className="chartsh" />
          </div>
        </div>
      </div>
      <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
        <div className="card">
          <div className="header">
            <h2>Chart 2</h2>
            <ul className="header-dropdown m-r--5">
              <li className="dropdown">
                <a href="#" onclick="return false;" className="dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                  <i className="material-icons">more_vert</i>
                </a>
                <ul className="dropdown-menu pull-right">
                  <li>
                    <a href="#" onclick="return false;">Action</a>
                  </li>
                  <li>
                    <a href="#" onclick="return false;">Another action</a>
                  </li>
                  <li>
                    <a href="#" onclick="return false;">Something else here</a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="body">
            <div id="echart_area_line" className="chartsh" />
          </div>
        </div>
      </div>
      <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
        <div className="card">
          <div className="header">
            <h2>Chart 3</h2>
            <ul className="header-dropdown m-r--5">
              <li className="dropdown">
                <a href="#" onclick="return false;" className="dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                  <i className="material-icons">more_vert</i>
                </a>
                <ul className="dropdown-menu pull-right">
                  <li>
                    <a href="#" onclick="return false;">Action</a>
                  </li>
                  <li>
                    <a href="#" onclick="return false;">Another action</a>
                  </li>
                  <li>
                    <a href="#" onclick="return false;">Something else here</a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="body">
            <div id="echart_bar" className="chartsh" />
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
 
    </>
  )
}

export default Dashboard
