import React from "react";
import { Link } from "react-router-dom";

const BreadCrumb = ({ items }) => {
  return (
    <div className="BreadCrumb mb-0 py-2">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <p className="text-center mb-0">
              {items.map((item, index) => (
                <React.Fragment key={index}>
                  {index > 0 && " / "}
                  {item.url ? (
                    <Link to={item.url} className="text-dark">
                      {item.title}
                    </Link>
                  ) : (
                    <span>{item.title}</span>
                  )}
                </React.Fragment>
              ))}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreadCrumb;
