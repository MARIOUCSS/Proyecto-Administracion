import React from "react";
import { NavLink, Link } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Reducers/authslice";
import { toast } from "react-toastify";
import { Badge } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
function Header() {
  const auth = useSelector((state) => state.auth);
  const cartShop = useSelector((state) => state.cartShop);
  const Cantidadshop = () => {
    const Cartshop = [...cartShop.cartItems];
    const total = Cartshop.reduce((ac, x) => {
      return ac + x.cuantity;
    }, 0);
    return total;
  };
  const dispatch = useDispatch();
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" href="#">
            <FaCartShopping />
            Cart-shop
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/" className="nav-link " href="#">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/category" className="nav-link " href="#">
                  Category
                </NavLink>
              </li>
              {!auth._id ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link" href="#">
                      Signup
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link" href="#">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {auth.name}
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          to={`/dashboard/${auth.role == 1 ? "admin" : "user"}`}
                          className="dropdown-item"
                        >
                          DASHBOARD
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={() => {
                            dispatch(logout(null));

                            toast.warning("Cerrando Sesion", {
                              position: "botton-left",
                            });
                          }}
                          to="/login"
                          className="nav-link"
                          href="#"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>

                  {/* <li className="nav-item">
                    <NavLink
                      onClick={() => {
                        dispatch(logout(null));

                        toast.warning("Cerrando Sesion", {
                          position: "botton-left",
                        });
                      }}
                      to="/login"
                      className="nav-link"
                      href="#"
                    >
                      Logout
                    </NavLink>
                  </li> */}
                </>
              )}

              <li className="nav-item">
                <Badge count={Cantidadshop()} showZero>
                  <NavLink to="/cart" className="nav-link">
                    <ShoppingCartOutlined style={{ fontSize: "24px" }} />
                  </NavLink>
                </Badge>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
