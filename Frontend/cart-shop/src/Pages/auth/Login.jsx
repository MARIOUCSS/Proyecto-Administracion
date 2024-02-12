import React from "react";
import Layout from "../../Components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { LoginUser } from "../../Reducers/authslice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const Handlesubmitl = (e) => {
    e.preventDefault();
    console.log(email, password);
    const louser = { email, password };
    dispatch(LoginUser(louser));
    toast.success("Login");
    navigate(location.state || "/");
  };

  return (
    <Layout title="Login-Cart Shop">
      <div className="register">
        <form onSubmit={Handlesubmitl}>
          <h1 className="title">LOGIN</h1>

          <div className="mb-3">
            <input
              type="email"
              placeholder="Enter Your Email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Enter Your Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={() => {
                navigate("/forgot-password");
              }}
            >
              Forgot Password
            </button>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default Login;
