import React from "react";
import Layout from "../Components/Layout";
import { useSelector, useDispatch } from "react-redux";
function Homepages() {
  const auth = useSelector((state) => state.auth);
  return (
    <Layout>
      <h1>About Page</h1>
      <pre>{JSON.stringify(auth._id, null, 4)}</pre>
      <pre>{auth.role}</pre>
    </Layout>
  );
}

export default Homepages;
