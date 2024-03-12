import React from "react";
import { Link } from "react-router-dom";

const Bar = () => {
  return (
    <>
      <header className="header-upper py-2">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-2">
              <h2>
                <Link className="text-white" to="/">
                  Ecommex
                </Link>
              </h2>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Bar;
