import React, { useState } from "react";
import { Link } from "react-router-dom";
import BreadCrumb from "../../Components/BreadCrumb";
import Meta from "../../Components/Meta";
import Bar from "../../Components/Bar";
import toast from "react-hot-toast";
import axios from "axios";

const SellerForgotPassword = () => {
  const [email, setemail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post(
        `http://localhost:5000/auth/wholeSeller/forgot-password`,
        { email }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // If the server returns a 400 error, display the error message
        toast.error(error.response.data.message);
      } else {
        console.log(error);
        toast.error("Something went wrong");
      }
    } finally {
      setIsLoading(false); // Reset loading status to false
    }
  };

  return (
    <>
      <Bar />
      <Meta title={"Forgot Password"} />
      <BreadCrumb
        items={[
          { title: "Home", url: "/" },
          { title: "Seller Login", url: "/seller-login" },
          { title: "Forgot Password" },
        ]}
      />
      <div
        className="login-wrapper home-wrapper-2"
        style={{ padding: "146px" }}
      >
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="auth-card">
                <h3 className="text-center mb-3">Reset Your Password</h3>
                <p className="text-center my-2 mb-3">
                  Enter Your Email to Reset Your Password
                </p>
                <form
                  onSubmit={handleSubmit}
                  className="d-flex flex-column gap-15"
                >
                  <div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setemail(e.target.value)}
                      name="email"
                      placeholder="Enter Your Email"
                      className="form-control"
                      required
                    />
                  </div>
                  <div>
                    <div className="mt-3 d-flex justify-content-center flex-column gap-15 align-items-center">
                      {isLoading ? (
                        <div className="spinner"></div>
                      ) : (
                        <button className="button border-0" type="submit">
                          Submit
                        </button>
                      )}
                      <Link to="/seller-login">Cancel</Link>
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

export default SellerForgotPassword;
