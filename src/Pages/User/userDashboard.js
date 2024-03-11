import React from "react";
import BreadCrumb from "../../Components/BreadCrumb";
import Meta from "../../Components/Meta";
import { useAuth } from "../../Context/auth";

const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <>
      <Meta title={"Profile"} />
      <BreadCrumb title="My Profile" />
      <div className="dashboard-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="auth-card">
                <h3 className="text-center mb-3">My Profile</h3>
                <form className="d-flex flex-column gap-15">
                  <div>
                    <p>{auth?.user?.firstname}</p>
                  </div>
                  <div>
                    <p>{auth?.user?.lastname}</p>
                  </div>
                  <div className="mt-1">
                    <input
                      type="password"
                      name="password"
                      placeholder="Enter Your Password"
                      className="form-control"
                    />
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

export default Dashboard;
