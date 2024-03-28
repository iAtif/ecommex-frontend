import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BreadCrumb from "../../Components/BreadCrumb";
import Meta from "../../Components/Meta";
import toast from "react-hot-toast";
import Bar from "../../Components/Bar";
import axios from "axios";

const AdminResetPassword = () => {
  const [newPassword, setnewPassword] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = new URLSearchParams(location.search).get("token");
    try {
      const res = await axios.post(
        `http://localhost:5000/auth/admin/reset-password`,
        { token, newPassword }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin");
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
      <Bar />
      <Meta title={"Reset Password"} />
      <BreadCrumb title="Reset Password" />
      <div
        className="login-wrapper home-wrapper-2"
        style={{ padding: "180px" }}
      >
        <div className="container-xxl">
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

export default AdminResetPassword;
