import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Meta from "../Components/Meta";
import BreadCrumb from "../Components/BreadCrumb";
import Spinner from "../Components/Spinner";
import toast from "react-hot-toast";

const SubscriptionPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { plan } = location.state;
  const [loading, setLoading] = useState(false);

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
      console.log("Token:", tokenData);

      // Step 2: Create subscription
      const subscriptionDetails = {
        userId: JSON.parse(localStorage.getItem("auth"))?.user.userId,
        planId: plan._id,
        paymentToken: tokenData.id, // Use the token obtained from Stripe
        currency: "usd",
        payment: {
          method: "Credit-Card",
        },
      };

      const token = JSON.parse(localStorage.getItem("auth"))?.token;
      const subscriptionResponse = await fetch(
        "http://localhost:5000/subscription",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(subscriptionDetails),
        }
      );

      if (!subscriptionResponse.ok) {
        const errorData = await subscriptionResponse.json();
        throw new Error(errorData.message);
      }

      const subscriptionData = await subscriptionResponse.json();
      console.log("Subscription:", subscriptionData);
      toast.success("Subscription Confirm Successfully");
      setLoading(false);
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <Meta title={"Subscribe Plan"} />
      <BreadCrumb
        items={[{ title: "Home", url: "/" }, { title: "Subscribe Plan" }]}
      />
      <div className="checkout-wrapper home-wrapper-2 py-3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-7">
              <div className="checkout-left-data">
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
                      placeholder="CVC"
                      maxLength="3"
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="w-100">
                    <div className="d-flex justify-content-center py-2">
                      <button type="submit" className="button border-0">
                        Confirm Subscription
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-5">
              {/* Right column for subscription plan information */}
              <div className="border-left px-4">
                <h4 className="mb-3">Subscription Plan</h4>
                <div>
                  <p>Plan Name: {plan.name}</p>
                  <p>
                    Price: {plan.price.currency}
                    {plan.price.amount}
                  </p>
                  <p>Duration: {plan.durationInMonths} Month</p>
                  <p className="mb-0">Features:</p>
                  <ol>
                    {plan.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ol>
                  {/* Add more subscription plan details here */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubscriptionPayment;
