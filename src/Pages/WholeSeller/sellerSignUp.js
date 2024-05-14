import React, { useState } from "react";
import BreadCrumb from "../../Components/BreadCrumb";
import Meta from "../../Components/Meta";
import Bar from "../../Components/Bar";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

const SellerSignUp = () => {
  const [firstName, setfirstname] = useState("");
  const [lastName, setlastname] = useState("");
  const [businessName, setbusinessName] = useState("");
  const [email, setemail] = useState("");
  const [mobile, setmobile] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmpassword] = useState("");
  const navigate = useNavigate();

  //Form Function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:5000/auth/wholeSeller/register/`,
        {
          firstName,
          lastName,
          businessName,
          email,
          mobile,
          password,
          confirmPassword,
        }
      );
      // Check if registration was successful
      if (res.data.success) {
        toast.success(res.data.message);
        setTimeout(() => {
          navigate("/seller-login");
        }, 100);
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
      <Meta title={"Become a Seller"} />
      <BreadCrumb
        items={[{ title: "Home", url: "/" }, { title: "Become a Seller" }]}
      />
      <div
        className="login-wrapper home-wrapper-2 py-2"
        style={{ minHeight: "88vh" }}
      >
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="auth-card">
                <h3 className="text-center mb-3">Create Seller Account</h3>
                <form
                  onSubmit={handleSubmit}
                  className="d-flex flex-column gap-15"
                >
                  <div className="d-flex gap-15">
                    <div style={{ flex: 1 }}>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setfirstname(e.target.value)}
                        name="firstName"
                        placeholder="Enter Your First Name"
                        className="form-control"
                        required
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setlastname(e.target.value)}
                        name="lastName"
                        placeholder="Enter Your Last Name"
                        className="form-control"
                        required
                      />
                    </div>
                  </div>
                  <div className="mt-1">
                    <input
                      type="text"
                      value={businessName}
                      onChange={(e) => setbusinessName(e.target.value)}
                      name="businessName"
                      placeholder="Enter Your Business Name"
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
                      value={"+92-" + mobile}
                      onChange={(e) => setmobile(e.target.value.slice(4))}
                      name="mobile"
                      placeholder="Enter Your Mobile No"
                      className="form-control"
                      maxLength={14}
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
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setconfirmpassword(e.target.value)}
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="d-flex justify-content-start align-items-start">
                    <p>Already have an account?</p>
                    <Link to="/seller-login">
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

export default SellerSignUp;
