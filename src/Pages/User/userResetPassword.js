import React, { useState } from "react";
import BreadCrumb from "../../Components/BreadCrumb";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import Meta from "../../Components/Meta";

const ResetPassword = () => {
  const [newPassword, setnewPassword] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = new URLSearchParams(location.search).get("token");
    try {
      const res = await axios.post(
        `http://localhost:5000/auth/seller/reset-password`,
        { token, newPassword }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
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
    }
  };

  return (
    <>
      <Meta title={"Reset Password"} />
      <BreadCrumb
        items={[{ title: "Home", url: "/" }, { title: "Forgot Password" }]}
      />
      <div className="login-wrapper home-wrapper-2 py-5">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="auth-card">
                <h3 className="text-center mb-3">Reset Password</h3>
                <form
                  onSubmit={handleSubmit}
                  className="d-flex flex-column gap-15"
                >
                  <div>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setnewPassword(e.target.value)}
                      name="newPassword"
                      placeholder="Enter Your New Password"
                      className="form-control"
                      required
                    />
                  </div>
                  <div>
                    <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                      <button className="button border-0" type="submit">
                        Reset
                      </button>
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

export default ResetPassword;
