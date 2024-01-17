import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Layout({ children, title, description, keywords, author }) {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      {/* Esto es lo que se modificara el resto se mantenda */}
      <ToastContainer />
      <main style={{ minHeight: "70vh" }}> {children}</main>
      <Footer />
    </div>
  );
}
Layout.defaultProps = {
  title: "Ecommerce app",
  description: "Staxk project",
};

export default Layout;
