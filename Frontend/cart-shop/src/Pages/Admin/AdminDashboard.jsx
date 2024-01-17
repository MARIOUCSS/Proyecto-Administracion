import React from "react";
import Layout from "../../Components/Layout";
import AdminMenu from "../../Components/AdminMenu";
import { useSelector, useDispatch } from "react-redux";
function AdminDashboard() {
  const auth = useSelector((state) => state.auth);
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h3>Admin Name:{auth.name}</h3>
              <h3>Admin Email:{auth.email}</h3>
              <h3>Admin Contact:{auth.phone}</h3>
              <h3>Admin Address:{auth.address}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AdminDashboard;
