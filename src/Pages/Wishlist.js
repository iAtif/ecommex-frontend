import React from "react";
import Meta from "./../Components/Meta";
import BreadCrumb from "./../Components/BreadCrumb";

export const Wishlist = () => {
  return (
    <>
      <Meta title={"Whishlist"} />
      <BreadCrumb title="Wishlist" />
      <div className="wishlist-wrapper home-wrapper-2 py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-3">
              <div className="wishlist-card position-relative">
                <img
                  src="images/cross.svg"
                  alt="cross"
                  className="position-absolute cross img-fluid"
                />
                <div className="wishlist-card-image">
                  <img
                    src="images/watch.jpg"
                    className="img-fluid w-100"
                    alt="watch"
                  />
                </div>
                <div className="wishlist-product-details">
                  <h5 className="title">Iphone</h5>
                  <h6 className="price mt-2">Rs. 1000</h6>
                </div>
                <div className="d-flex justify-content-center mt-2">
                  <button className="button border-0">Buy Now</button>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="wishlist-card position-relative">
                <img
                  src="images/cross.svg"
                  alt="cross"
                  className="position-absolute cross img-fluid"
                />
                <div className="wishlist-card-image">
                  <img
                    src="images/watch.jpg"
                    className="img-fluid w-100"
                    alt="watch"
                  />
                </div>
                <div className="wishlist-product-details">
                  <h5 className="title">Iphone</h5>
                  <h6 className="price mt-2">Rs. 1000</h6>
                </div>
                <div className="d-flex justify-content-center mt-2">
                  <button className="button border-0">Buy Now</button>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="wishlist-card position-relative">
                <img
                  src="images/cross.svg"
                  alt="cross"
                  className="position-absolute cross img-fluid"
                />
                <div className="wishlist-card-image">
                  <img
                    src="images/watch.jpg"
                    className="img-fluid w-100"
                    alt="watch"
                  />
                </div>
                <div className="wishlist-product-details">
                  <h5 className="title">Iphone</h5>
                  <h6 className="price mt-2">Rs. 1000</h6>
                </div>
                <div className="d-flex justify-content-center mt-2">
                  <button className="button border-0">Buy Now</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Wishlist;
