import React from "react";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <div className="bg-dark text-light p-3">
      <h1 className="text-center">All Right Reserved</h1>
      <p className="footer">
        <Link to="/contact">Contact</Link>|<Link to="/about">About</Link>|
        <Link to="/policy">Privacy policy</Link>
      </p>
    </div>
  );
}

export default Footer;
