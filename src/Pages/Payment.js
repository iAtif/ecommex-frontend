import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Meta from "../Components/Meta";
import BreadCrumb from "../Components/BreadCrumb";
import { Link } from "react-router-dom";
import Spinner from "../Components/Spinner";
import toast from "react-hot-toast";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const orderInfo = JSON.parse(localStorage.getItem("orderInfo"));
  const { product, totalAmount, quantity } = location.state;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const cardDetails = {
      "card[number]": event.target.cardNumber.value,
      "card[exp_month]": event.target.expiryMonth.value,
      "card[exp_year]": event.target.expiryYear.value,
      "card[cvc]": event.target.cvc.value,
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
          customerId: JSON.parse(localStorage.getItem("auth"))?.user.userId,
        },
        products: [
          {
            productId: product.id,
            quantity: quantity,
            price: product.payableAmount,
          },
        ],
        totalAmount: totalAmount,
        paymentToken: tokenData.id, // Use the token obtained from Stripe
        currency: "pkr",
        status: "Pending",
        payment: {
          method: orderInfo.paymentMethod,
        },
        shipping: {
          address: orderInfo.address,
          mobile: orderInfo.mobile,
          method: orderInfo.shippingMethod,
        },
      };
      const token = JSON.parse(localStorage.getItem("auth"))?.token;
      const orderResponse = await fetch("http://localhost:5000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include user token in the authorization header
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
      localStorage.removeItem("orderInfo");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
      setLoading(false);
    }
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
                    <Link
                      className="breadcrumbs-item total-price active"
                      aria-current="page"
                      to={"/checkout-information"}
                    >
                      Information & Shipping
                    </Link>
                    &nbsp; / &nbsp;
                    <li
                      className="breadcrumbs-item text-dark total-price active"
                      aria-current="page"
                    >
                      Payment
                    </li>
                  </ol>
                </nav>
                <h4 className="mb-3">Payment Information</h4>
                <form
                  onSubmit={handleSubmit}
                  className="d-flex flex-wrap gap-15 justify-content-between"
                >
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
                  <div className="w-100">
                    <div className="d-flex justify-content-center py-2">
                      <button type="submit" className="button border-0">
                        Confirm Order
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

export default Payment;
