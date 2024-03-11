import React from "react";
import { NavLink, Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { useAuth } from "../Context/auth";
import toast from "react-hot-toast";

const Header = () => {
  const [auth, setAuth] = useAuth();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };
  return (
    <>
      <header className="header-top-strip">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12 text-end">
              <Link to="/seller-signup" className="text-white">
                Become a Seller
              </Link>
            </div>
          </div>
        </div>
      </header>
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
                    <p className="mb-0">
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
                    <p className="mb-0">Wishlist</p>
                  </Link>
                </div>
                <div>
                  <Link
                    className="d-flex align-items-center gap-10 text-white"
                    to="/cart"
                  >
                    <img src="/images/cart.svg" alt="cart"></img>
                    <div className="gap-10">
                      <span className="badge bg-white text-dark">5</span>
                      <p className="mb-0">500PKR</p>
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
                    <span className="d-inline-block">My Account</span>
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
                        <span className="d-flex justify-content-center text-white">
                          Hi, {auth?.user?.firstname}
                        </span>
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
      <header className="header-bottom py-1">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="menu-bottom d-flex align-items-center gap-30">
                <div>
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
                </div>
                <div className="menu-links">
                  <div className="d-flex align-items-center gap-20">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/products">Our Store</NavLink>
                    <NavLink to="/trending">Trending Products</NavLink>
                    {/* <NavLink to="/blogs">Our Blogs</NavLink> */}
                    <NavLink to="/contact">Contact Us</NavLink>
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
