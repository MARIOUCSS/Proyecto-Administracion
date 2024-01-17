import React, { useState } from "react";
import Layout from "../../Components/Layout";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RegisterUser } from "../../Reducers/authslice";
function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  /////
  const handlesubmit = (e) => {
    e.preventDefault();
    const user = { name, email, password, phone, address, answer };
    console.log(name, email, password, phone, address, answer);
    dispatch(RegisterUser(user));
    toast.success("register");
    navigate("/login");
  };
  return (
    <Layout title="Register-Cart Shop">
      <div className="register">
        <form onSubmit={handlesubmit}>
          <h1 className="title">Register User</h1>
          <div className="mb-3">
            <input
              placeholder="Enter Your Name"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
            <input
              placeholder="Enter Your Phone"
              className="form-control"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              className="form-control"
              placeholder="Enter Your Address"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              className="form-control"
              placeholder="what is your favorite deport"
              onChange={(e) => setAnswer(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            // onClick={() => {
            //   navigate("/forgot-password");
            // }}
          >
            Forgot Password
          </button>
          <br />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default Register;
