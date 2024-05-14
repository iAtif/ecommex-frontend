import React from "react";
import Meta from "../Components/Meta";
import { useLocation, useNavigate } from "react-router-dom";
import BreadCrumb from "../Components/BreadCrumb";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product, totalAmount, quantity } = location.state;
  const authData = JSON.parse(localStorage.getItem("auth"));
  const { email, firstName, lastName, mobile } = authData.user;

  const handlePayment = () => {
    navigate("/checkout-payment", {
      state: {
        product,
        totalAmount,
        quantity,
        orderInfo: JSON.parse(localStorage.getItem("orderInfo")),
      },
    });
  };
  const handleFormSubmit = (event) => {
    event.preventDefault();

    const address = document.getElementById("address").value;
    const mobile = document.getElementById("mobile").value;
    const shippingMethod = document.getElementById("shippingMethod").value;
    const paymentMethod = document.getElementById("paymentMethod").value;

    const orderInfo = {
      address: address,
      mobile: mobile,
      shippingMethod: shippingMethod,
      paymentMethod: paymentMethod,
    };
    localStorage.setItem("orderInfo", JSON.stringify(orderInfo));
  };

  return (
    <>
      <Meta title={"Checkout"} />
      <BreadCrumb
        items={[
          { title: "Home", url: "/" },
          { title: "Our Store", url: "/store" },
          { title: `${product.name}`, url: `/store/${product.id}` },
          { title: "Checkout" },
        ]}
      />
      <div className="checkout-wrapper home-wrapper-2 py-3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-7">
              <div className="checkout-left-data">
                <nav
                  style={{ "--bs-breadcrumb-divider": ">" }}
                  aria-label="breadcrumb"
                >
                  <ol className="breadcrumb">
                    <li
                      className="breadcrumbs-item text-dark  total-price active"
                      aria-current="page"
                    >
                      Information & Shipping
                    </li>
                    &nbsp; / &nbsp;
                    <li
                      className="breadcrumbs-item  total-price active"
                      aria-current="page"
                    >
                      Payment
                    </li>
                  </ol>
                </nav>
                <h4 className="title">Contact Information</h4>
                <div className="d-flex flex-wrap gap-15 justify-content-between mb-3">
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      placeholder="First Name"
                      className="form-control"
                      defaultValue={firstName}
                    />
                  </div>
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="form-control"
                      defaultValue={lastName}
                    />
                  </div>
                </div>
                <div className="d-flex flex-wrap gap-15 justify-content-between mb-3">
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      placeholder="Email"
                      className="form-control"
                      defaultValue={email}
                    />
                  </div>
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      placeholder="Mobile No"
                      className="form-control"
                      defaultValue={"+92-" + mobile}
                      id="mobile"
                    />
                  </div>
                </div>
                <h4 className="title">Shipping Address</h4>
                <form
                  action=""
                  className="d-flex flex-wrap gap-15 justify-content-between"
                  onClick={handleFormSubmit}
                >
                  <div className="w-100">
                    <input
                      type="text"
                      placeholder="Complete Address"
                      className="form-control"
                      id="address"
                      required
                    />
                  </div>
                  <div className="flex-grow-1">
                    <select
                      name="shippingMethod"
                      className="form-control form-select"
                      id="shippingMethod"
                      defaultValue=""
                      required
                    >
                      <option value="" disabled hidden>
                        Select Shipping Method
                      </option>
                      <option value="Standard">Standard</option>
                      <option value="Express">Express</option>
                    </select>
                  </div>
                  <div className="w-100">
                    <h4 className="title">Payment Method</h4>
                    <div className="flex-grow-1">
                      <select
                        name="state"
                        className="form-control form-select"
                        id="paymentMethod"
                        defaultValue=""
                        required
                      >
                        <option value="" disabled hidden>
                          Select Payment Method
                        </option>
                        <option value="Credit-Card">Credit Card</option>
                        <option value="Cash-on-Delivery">
                          Cash on Delivery
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className="w-100 mt-4">
                    <div className="d-flex justify-content-between align-items-center">
                      <Link to={`/store/${product.id}`} className="text-dark">
                        <BiArrowBack className="me-2" />
                        Return to Product
                      </Link>
                      <button
                        onClick={handlePayment}
                        className="button border-0"
                        type="submit"
                      >
                        Continue to Payment
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-5">
              <div className="border-bottom py-4">
                <div className="d-flex gap-10 mb-2 align-items-center">
                  <div className="w-75 d-flex gap-10">
                    <div className="w-25 position-relative">
                      <img
                        className="img-fluid"
                        src={product.images[0]}
                        alt="product"
                      />
                    </div>
                    <div>
                      <h5 className="total-price">{product.name}</h5>
                      <p className="total-price">{quantity} pieces</p>
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <h5 className="total">
                      {product.price.currency} {product.payableAmount}
                    </h5>
                  </div>
                </div>
              </div>
              <div className="border-bottom py-4">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="total">Subtotal</p>
                  <p className="total-price">
                    {product.price.currency} {totalAmount}
                  </p>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-0 total">Shipping</p>
                  <p className="mb-0 total-price">Standard (FREE)</p>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center border-bottom py-4">
                <h4 className="total">Total</h4>
                <h5 className="total-price">
                  {product.price.currency} {totalAmount}
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
