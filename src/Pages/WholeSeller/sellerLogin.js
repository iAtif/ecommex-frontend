import React, { useState } from "react";
import BreadCrumb from "../../Components/BreadCrumb";
import Meta from "../../Components/Meta";
import Bar from "../../Components/Bar";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../../Context/auth";

const SellerLogin = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  //Form Function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:5000/auth/wholeSeller/login`,
        {
          email,
          password,
        }
      );
      if (res.status === 200) {
        setAuth({
          ...auth,
          seller: res.data.seller,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        toast.success("Login Successful");
        setTimeout(() => {
          navigate("/seller-dashboard");
        }, 100);
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
      <Meta title={"Seller Login"} />
      <BreadCrumb
        items={[{ title: "Home", url: "/" }, { title: "Seller Login" }]}
      />
      <div
        className="login-wrapper home-wrapper-2 d-flex justify-content-center align-items-center"
        style={{ minHeight: "88vh" }}
      >
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="auth-card">
                <h3 className="text-center mb-3">Seller Login</h3>
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
                    <Link to="/seller-forgot-password">Forgot Password?</Link>
                    <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                      <button className="button border-0" type="submit">
                        Login
                      </button>
                      <Link className="button signup" to="/seller-register">
                        SignUp
                      </Link>
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

export default SellerLogin;
