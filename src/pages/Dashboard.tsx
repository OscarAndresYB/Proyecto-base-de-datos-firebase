import {SmallBox} from '@app/components';
import React from 'react';
import {ContentHeader} from '@components';

const Dashboard = () => {
  return (
    <div>
      <ContentHeader title="Dashboard" />

      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 col-6">
              <div className="small-box bg-info">
                <div className="inner">
                  <h3>Ir a </h3>

                  <h2>Empresas</h2>
                </div>
                <div className="icon">
                  <i className="fas fa-building nav-icon" />
                </div>
                <a href="/empresas" className="small-box-footer">
                  More info <i className="fas fa-arrow-circle-right" />
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="small-box bg-success">
                <div className="inner">
                  <h3>
                    Ir a
                  </h3>

                  <h2>Usuarios</h2>
                </div>
                <div className="icon">
                  <i className="fas fa-users nav-icon" />
                </div>
                <a href="/usuarios" className="small-box-footer">
                  More info <i className="fas fa-arrow-circle-right" />
                </a>
              </div>
            </div>
            {/* <div className="col-lg-3 col-6">
              <div className="small-box bg-warning">
                <div className="inner">
                  <h3>Ir a</h3>

                  <h2>TipoUsuario</h2>
                </div>
                <div className="icon">
                  <i className="fas fa-user-tag nav-icon" />
                </div>
                <a href="/tipousuario" className="small-box-footer">
                  More info <i className="fas fa-arrow-circle-right" />
                </a>
              </div>
            </div> */}
            <div className="col-lg-3 col-6">
              <div className="small-box bg-danger">
                <div className="inner">
                  <h3>Ir a</h3>

                  <h2>TipoUsuario</h2>
                </div>
                <div className="icon">
                  <i className="fas fa-user-tag nav-icon" />
                </div>
                <a href="/tipousuario" className="small-box-footer">
                  More info <i className="fas fa-arrow-circle-right" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
