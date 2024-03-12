import React from "react";
import BreadCrumb from "../../Components/BreadCrumb";
import Meta from "../../Components/Meta";
import Bar from "../../Components/Bar";

const SellerSignUp = () => {
  return (
    <>
      <Bar />
      <Meta title={"Become a Seller"} />
      <BreadCrumb title="Become a Seller" />
      <div className="login-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="auth-card">
                <h3 className="text-center mb-3">Create Seller Account</h3>
                <form action="" className="d-flex flex-column gap-15">
                  <div>
                    <input
                      type="text"
                      name="first-name"
                      placeholder="First Name"
                      className="form-control"
                    />
                  </div>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="last-name"
                      placeholder="Last Name"
                      className="form-control"
                    />
                  </div>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="business-name"
                      placeholder="Business Name"
                      className="form-control"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="form-control"
                    />
                  </div>
                  <div className="mt-1">
                    <input
                      type="tel"
                      name="mobile"
                      placeholder="Mobile No"
                      className="form-control"
                    />
                  </div>
                  <div className="mt-1">
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      className="form-control"
                    />
                  </div>
                  <div>
                    <div className="d-flex justify-content-center gap-15 align-items-center">
                      <button className="button border-0">Create</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SellerSignUp;
