import React, { useState } from "react";
import BreadCrumb from "../../Components/BreadCrumb";
import Meta from "../../Components/Meta";
import Bar from "../../Components/Bar";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../../Context/auth";

const AdminLogin = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  //Form Function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:5000/auth/admin/login`, {
        email,
        password,
      });
      if (res.status === 200) {
        toast.success("Login Successful");
        setAuth({
          ...auth,
          admin: res.data.admin,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        // Wait for a short delay before navigating to ensure data is stored
        setTimeout(() => {
          navigate("/admin-dashboard");
        }, 1000); // Adjust the delay as needed
      } else {
        console.log(res);
        toast.error(res.data);
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
      <Meta title={"Admin Login"} />
      <BreadCrumb title="Admin Login" />
      <div
        className="login-wrapper home-wrapper-2"
        style={{ padding: "135px" }}
      >
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="auth-card">
                <h3 className="text-center mb-3">Admin Login</h3>
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
                  <div className="mt-1">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setpassword(e.target.value)}
                      name="password"
                      placeholder="Enter Your Password"
                      className="form-control"
                    />
                  </div>
                  <div>
                    <Link to="/admin-forgot-password">Forgot Password?</Link>
                    <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                      <button className="button border-0" type="submit">
                        Login
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

export default AdminLogin;
