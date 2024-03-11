import React, { useState } from "react";
import BreadCrumb from "../../Components/BreadCrumb";
import Meta from "../../Components/Meta";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const SignUp = () => {
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setemail] = useState("");
  const [mobile, setmobile] = useState("");
  const [secret, setsecret] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  //Form Function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/auth/register`,
        { firstname, lastname, email, mobile, secret, password }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <Meta title={"SignUp"} />
      <BreadCrumb title="SignUp" />
      <div className="login-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="auth-card">
                <h3 className="text-center mb-3">Create Account</h3>
                <form
                  onSubmit={handleSubmit}
                  className="d-flex flex-column gap-15"
                >
                  <div>
                    <input
                      type="text"
                      value={firstname}
                      onChange={(e) => setfirstname(e.target.value)}
                      name="firstname"
                      placeholder="Enter Your First Name"
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mt-1">
                    <input
                      type="text"
                      value={lastname}
                      onChange={(e) => setlastname(e.target.value)}
                      name="lastname"
                      placeholder="Enter Your Last Name"
                      className="form-control"
                      required
                    />
                  </div>
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
                      type="tel"
                      value={mobile}
                      onChange={(e) => setmobile(e.target.value)}
                      name="mobile"
                      placeholder="Enter Your Mobile No"
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
                      placeholder="Enter Password"
                      className="form-control"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={secret}
                      onChange={(e) => setsecret(e.target.value)}
                      name="secret"
                      placeholder="Enter Your Secret Text"
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="d-flex justify-content-start align-items-start">
                    <p>Already have an account?</p>
                    <Link to="/login">
                      <u>Login</u>
                    </Link>
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

export default SignUp;
