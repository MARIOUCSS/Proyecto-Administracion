import React from "react";
import Layout from "../../Components/Layout";
import UserMenu from "../../Components/UserMenu";

function Profile() {
  return (
    <Layout>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">Profile</div>
        </div>
      </div>
    </Layout>
  );
}

export default Profile;
