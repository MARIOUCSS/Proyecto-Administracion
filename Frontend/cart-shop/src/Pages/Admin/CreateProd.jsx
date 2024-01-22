import React from "react";
import Layout from "../../Components/Layout";
import AdminMenu from "../../Components/AdminMenu";

function CreateProd() {
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">create PRODUCd</div>
        </div>
      </div>
    </Layout>
  );
}

export default CreateProd;
