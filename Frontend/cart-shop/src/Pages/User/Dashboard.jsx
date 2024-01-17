import React from "react";
import Layout from "../../Components/Layout";
import UserMenu from "../../Components/UserMenu";

function Dashboard() {
  return (
    <Layout title={"Dashboard -Ecomerce App"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">content</div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
