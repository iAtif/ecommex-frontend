import React from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { useAuth } from "../Context/auth";
import toast from "react-hot-toast";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {!auth.user && (
        <header className="header-top-strip">
          <div className="container-xxl">
            <div className="row">
              <div className="col-12 text-end">
                <Link to="/seller-register" className="text-white">
                  Become a Seller
                </Link>
              </div>
            </div>
          </div>
        </header>
      )}
      <header className="header-upper py-2">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-2">
              <h2>
                <Link className="text-white" to="/">
                  Ecommex
                </Link>
              </h2>
            </div>
            <div className="col-5">
              <div className="input-group">
                <input
                  type="text"
                  id="searchInput"
                  name="searchProduct"
                  className="form-control py-2"
                  placeholder="Search Product Here.."
                  aria-label="Search Product Here.."
                  aria-describedby="basic-addon2"
                />
                <span className="input-group-text" id="basic-addon2">
                  <BsSearch className="fs-6" />
                </span>
              </div>
            </div>
            <div className="col-5">
              <div className="header-upper-links d-flex align-items-center justify-content-between">
                <div>
                  <Link
                    className="d-flex align-items-center gap-10 text-white"
                    to="/compare"
                  >
                    <img src="/images/compare.svg" alt="compare"></img>
                    <p
                      className={
                        isActiveLink("/compare") ? "active-upper-links" : "mb-0"
                      }
                    >
                      Compare <br /> Products
                    </p>
                  </Link>
                </div>
                <div>
                  <Link
                    className="d-flex align-items-center gap-10 text-white"
                    to="/wishlist"
                  >
                    <img src="/images/wishlist.svg" alt="wishlist"></img>
                    <p
                      className={
                        isActiveLink("/wishlist")
                          ? "active-upper-links"
                          : "mb-0"
                      }
                    >
                      Wishlist
                    </p>
                  </Link>
                </div>
                <div>
                  <Link
                    className="d-flex align-items-center gap-10 text-white"
                    to="/cart"
                  >
                    <img
                      src="/images/cart.svg"
                      alt="cart"
                      style={{ position: "relative" }}
                    />
                    <div className="gap-10" style={{ position: "relative" }}>
                      <p
                        className={
                          isActiveLink("/cart") ? "active-upper-links" : "mb-0"
                        }
                      >
                        My Cart
                      </p>
                      <span className="badge bg-white text-dark">1</span>
                    </div>
                  </Link>
                </div>
                <div className="dropdown">
                  <button
                    className="btn text-white dropdown-toggle bg-transparent border-0 d-flex align-items-center gap-10"
                    type="button"
                    id="dropdownMenuButton2"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img src="images/user.svg" alt="user" />
                    {auth.user ? (
                      <span className="d-inline-block">
                        Hi, {auth.user.firstName}
                      </span>
                    ) : (
                      <span className="d-inline-block">My Account</span>
                    )}
                  </button>
                  {!auth.user ? (
                    <>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton2"
                      >
                        <li>
                          <Link
                            className="dropdown-item text-white"
                            to="/register"
                          >
                            Register
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="dropdown-item text-white border-0"
                            to="/login"
                          >
                            Login
                          </Link>
                        </li>
                      </ul>
                    </>
                  ) : (
                    <>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton2"
                      >
                        <span className="d-flex justify-content-center text-white"></span>
                        <li>
                          <Link
                            className="dropdown-item text-white"
                            to="/dashboard"
                          >
                            Dashboard
                          </Link>
                        </li>
                        <li>
                          <Link
                            onClick={handleLogout}
                            className="dropdown-item text-white border-0"
                            to="/"
                          >
                            Logout
                          </Link>
                        </li>
                      </ul>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <header
        className="header-bottom py-1"
        style={{
          height: !isActiveLink("/home") ? "38px" : "auto",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="menu-bottom d-flex align-items-center gap-30">
                {isActiveLink("/") && (
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle bg-transparent border-0 gap-15 d-flex align-items-center"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img src="images/category.png" alt="category" />
                      <span className="d-inline-block">Shop By Categories</span>
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <Link className="dropdown-item text-white" to="/">
                          Action
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item text-white" to="/">
                          Another action
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item text-white border-0"
                          to="/"
                        >
                          Something else here
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
                <div className="menu-links">
                  <div className="d-flex align-items-center gap-20">
                    <NavLink
                      exact
                      to="/"
                      className={isActiveLink("/") ? "active-link" : ""}
                    >
                      Home
                    </NavLink>
                    <NavLink
                      to="/products"
                      className={isActiveLink("/products") ? "active-link" : ""}
                    >
                      Our Store
                    </NavLink>
                    <NavLink
                      to="/trending"
                      className={isActiveLink("/trending") ? "active-link" : ""}
                    >
                      Trending Products
                    </NavLink>
                    {/* <NavLink to="/blogs">Our Blogs</NavLink> */}
                    <NavLink
                      to="/contact"
                      className={isActiveLink("/contact") ? "active-link" : ""}
                    >
                      Contact Us
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
