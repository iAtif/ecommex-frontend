import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const Bar = () => {
  const location = useLocation();
  const isRegisterPage = location.pathname === "/seller-register"; // Check for register page

  return (
    <>
      <header className="header-upper py-1">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-2">
              <h2 className="mb-0">
                <Link className="text-white" to="/">
                  Ecommex
                </Link>
              </h2>
            </div>
            <div className="col-auto ms-auto">
              {isRegisterPage ? (
                <Link to="/seller-login" className="button signup">
                  Login
                </Link>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </header>
      <Toaster />
    </>
  );
};
export default Bar;
