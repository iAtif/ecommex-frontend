import React from "react";
import Meta from "./../Components/Meta";
import BreadCrumb from "./../Components/BreadCrumb";

const CompareProduct = () => {
  return (
    <>
      <Meta title={"Compare Products"} />
      <BreadCrumb title="Compare Products" />
      <div className="compare-product-wrapper home-wrapper-2 py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-3">
              <div className="compare-product-card position-relative">
                <img
                  src="images/cross.svg"
                  alt="cross"
                  className="position-absolute cross img-fluid"
                />
                <div className="product-card-image">
                  <img src="images/watch.jpg" alt="watch" />
                </div>
                <div className="compare-product-details">
                  <h5 className="title">Iphone</h5>
                  <h6 className="price mt-2">Rs. 1000</h6>
                </div>
                <div>
                  <div className="product-details">
                    <h5 className="mb-0">Brand:</h5>
                    <p className="mb-0">Apple</p>
                  </div>
                  <div className="product-details">
                    <h5 className="mb-0">Type:</h5>
                    <p className="mb-0">Apple</p>
                  </div>
                  <div className="product-details">
                    <h5 className="mb-0">Availability</h5>
                    <p className="mb-0">In Stock</p>
                  </div>
                  <div className="product-details">
                    <h5 className="mb-0">Color</h5>
                    {/* <Color /> */}
                  </div>
                  <div className="product-details">
                    <h5 className="mb-0">Size</h5>
                    <div className="d-flex gap-10 mb-0">
                      <p className="mb-0">S</p>
                      <p className="mb-0">M</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="compare-product-card position-relative">
                <img
                  src="images/cross.svg"
                  alt="cross"
                  className="position-absolute cross img-fluid"
                />
                <div className="product-card-image">
                  <img src="images/watch.jpg" alt="watch" />
                </div>
                <div className="compare-product-details">
                  <h5 className="title">Iphone</h5>
                  <h6 className="price mt-2">Rs. 1000</h6>
                </div>
                <div>
                  <div className="product-details">
                    <h5 className="mb-0">Brand:</h5>
                    <p className="mb-0">Apple</p>
                  </div>
                  <div className="product-details">
                    <h5 className="mb-0">Type:</h5>
                    <p className="mb-0">Apple</p>
                  </div>
                  <div className="product-details">
                    <h5 className="mb-0">Availability</h5>
                    <p className="mb-0">In Stock</p>
                  </div>
                  <div className="product-details">
                    <h5 className="mb-0">Color</h5>
                    {/* <Color /> */}
                  </div>
                  <div className="product-details">
                    <h5 className="mb-0">Size</h5>
                    <div className="d-flex gap-10 mb-0">
                      <p className="mb-0">S</p>
                      <p className="mb-0">M</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="compare-product-card position-relative">
                <img
                  src="images/cross.svg"
                  alt="cross"
                  className="position-absolute cross img-fluid"
                />
                <div className="product-card-image">
                  <img src="images/watch.jpg" alt="watch" />
                </div>
                <div className="compare-product-details">
                  <h5 className="title">Iphone</h5>
                  <h6 className="price mt-2">Rs. 1000</h6>
                </div>
                <div>
                  <div className="product-details">
                    <h5 className="mb-0">Brand:</h5>
                    <p className="mb-0">Apple</p>
                  </div>
                  <div className="product-details">
                    <h5 className="mb-0">Type:</h5>
                    <p className="mb-0">Apple</p>
                  </div>
                  <div className="product-details">
                    <h5 className="mb-0">Availability</h5>
                    <p className="mb-0">In Stock</p>
                  </div>
                  <div className="product-details">
                    <h5 className="mb-0">Color</h5>
                    {/* <Color /> */}
                  </div>
                  <div className="product-details">
                    <h5 className="mb-0">Size</h5>
                    <div className="d-flex gap-10 mb-0">
                      <p className="mb-0">S</p>
                      <p className="mb-0">M</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="compare-product-card position-relative">
                <img
                  src="images/cross.svg"
                  alt="cross"
                  className="position-absolute cross img-fluid"
                />
                <div className="product-card-image">
                  <img src="images/watch.jpg" alt="watch" />
                </div>
                <div className="compare-product-details">
                  <h5 className="title">Iphone</h5>
                  <h6 className="price mt-2">Rs. 1000</h6>
                </div>
                <div>
                  <div className="product-details">
                    <h5 className="mb-0">Brand:</h5>
                    <p className="mb-0">Apple</p>
                  </div>
                  <div className="product-details">
                    <h5 className="mb-0">Type:</h5>
                    <p className="mb-0">Apple</p>
                  </div>
                  <div className="product-details">
                    <h5 className="mb-0">Availability</h5>
                    <p className="mb-0">In Stock</p>
                  </div>
                  <div className="product-details">
                    <h5 className="mb-0">Color</h5>
                    {/* <Color /> */}
                  </div>
                  <div className="product-details">
                    <h5 className="mb-0">Size</h5>
                    <div className="d-flex gap-10 mb-0">
                      <p className="mb-0">S</p>
                      <p className="mb-0">M</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompareProduct;
