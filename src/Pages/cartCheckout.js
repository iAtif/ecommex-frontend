import React, { useState } from "react";
import Meta from "../Components/Meta";
import { useLocation } from "react-router-dom";
import BreadCrumb from "../Components/BreadCrumb";
import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import Spinner from "../Components/Spinner";
import toast from "react-hot-toast";

const CartCheckout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { cartProducts, totalAmount } = location.state;
  const authData = JSON.parse(localStorage.getItem("auth"));
  const { email, firstName, lastName, mobile } = authData.user;
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    // Retrieve form data
    const formData = new FormData(event.target);
    const paymentMethod = formData.get("paymentMethod");

    if (paymentMethod === "Credit-Card") {
      const cardDetails = {
        "card[number]": formData.get("cardNumber"),
        "card[exp_month]": formData.get("expiryMonth"),
        "card[exp_year]": formData.get("expiryYear"),
        "card[cvc]": formData.get("cvc"),
      };

      try {
        // Step 1: Fetch token from Stripe
        const response = await fetch("https://api.stripe.com/v1/tokens", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization:
              "Bearer pk_test_51P5iFC03QMjI8IJwEyDwckzaXFzj0eHoyEhTcLCWaURkyszkVkjHrLk7VtL0flCWuTrbsEOzyHjV294goqtBStl100JBRqZKM6",
          },
          body: new URLSearchParams(cardDetails).toString(),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error.message);
        }

        const tokenData = await response.json();

        // Step 2: Create order
        const orderDetails = {
          customer: {
            customerId: authData.user.userId,
          },
          products: cartProducts.map((product) => ({
            productId: product.product._id,
            quantity: product.quantity,
            price: product.product.payableAmount,
          })),
          totalAmount: totalAmount,
          paymentToken: tokenData.id,
          currency: "pkr",
          status: "Pending",
          payment: {
            method: "Credit-Card",
          },
          shipping: {
            address: formData.get("address"),
            mobile: mobile,
            method: formData.get("shippingMethod"),
          },
        };

        const token = authData.token;
        const orderResponse = await fetch("http://localhost:5000/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(orderDetails),
        });

        if (!orderResponse.ok) {
          const errorData = await orderResponse.json();
          throw new Error(errorData.message);
        }

        const orderData = await orderResponse.json();
        console.log("Order:", orderData);
        toast.success("Order Confirm Successfully");
        setLoading(false);
        navigate("/");
      } catch (error) {
        console.log(error.message);
        toast.error(error.message);
        setLoading(false);
      }
    } else {
      // Handle other payment methods like Cash on Delivery
      // Implement logic here
    }
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <Meta title={"Checkout"} />
      <BreadCrumb
        items={[
          { title: "Home", url: "/" },
          { title: "Cart", url: "/cart" },
          { title: "Checkout" },
        ]}
      />
      <div className="checkout-wrapper home-wrapper-2 py-3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-7">
              <div className="checkout-left-data">
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
                  className="d-flex flex-wrap gap-15 justify-content-between"
                  onSubmit={handleSubmit}
                >
                  <div className="w-100">
                    <input
                      type="text"
                      placeholder="Complete Address"
                      className="form-control"
                      id="address"
                      name="address"
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
                        name="paymentMethod"
                        className="form-control form-select"
                        id="paymentMethod"
                        onChange={handlePaymentMethodChange}
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
                  {paymentMethod === "Credit-Card" && (
                    <>
                      <div className="w-100">
                        <h4 className="title">Card Information</h4>
                        <div className="w-100">
                          <input
                            type="text"
                            name="cardNumber"
                            placeholder="Card No"
                            className="form-control"
                            maxLength="16"
                            required
                          />
                        </div>
                        <div className="d-flex flex-wrap gap-15 justify-content-between mt-3">
                          <div className="flex-grow-1">
                            <select
                              name="expiryMonth"
                              className="form-control form-select"
                              defaultValue=""
                              required
                            >
                              <option value="" disabled hidden>
                                Expiry Month
                              </option>
                              {[...Array(12).keys()].map((month) => (
                                <option key={month + 1} value={month + 1}>
                                  {month + 1}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="flex-grow-1">
                            <select
                              name="expiryYear"
                              className="form-control form-select"
                              defaultValue=""
                              required
                            >
                              <option value="" disabled hidden>
                                Expiry Year
                              </option>
                              {[...Array(6).keys()].map((index) => {
                                const year = 2024 + index;
                                return (
                                  <option key={year} value={year}>
                                    {year}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                          <div className="flex-grow-1">
                            <input
                              type="text"
                              name="cvc"
                              className="form-control"
                              placeholder="CVC"
                              maxLength="3"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  <div className="w-100 mt-4">
                    <div className="d-flex justify-content-between align-items-center">
                      <Link to={"/cart"} className="text-dark">
                        <BiArrowBack className="me-2" />
                        Return to Cart
                      </Link>
                      <button className="button border-0" type="submit">
                        Confirm Order
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-5">
              <div className="border-bottom py-4">
                {cartProducts.map((product) => (
                  <div key={product.product._id} className="mb-3">
                    <div className="d-flex gap-10 mb-2 align-items-center">
                      <div className="w-75 d-flex gap-10">
                        <div>
                          <img
                            src={product.product.images[0]}
                            alt="product"
                            style={{ width: "100px", height: "100px" }}
                          />
                        </div>
                        <div>
                          <h5 className="total-price">
                            {product.product.name}
                          </h5>
                          <p className="total-price mb-0">
                            {product.quantity} pieces
                          </p>
                          <h5 className="total">
                            Rs. {product.product.payableAmount}
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-bottom py-4">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="total">Subtotal</p>
                  <p className="total-price">Rs. {totalAmount}</p>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-0 total">Shipping</p>
                  <p className="mb-0 total-price">Standard (FREE)</p>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center border-bottom py-4">
                <h4 className="total">Total</h4>
                <h5 className="total-price">Rs. {totalAmount}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartCheckout;
