import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Meta from "../Components/Meta";
import ProductCard from "../Components/ProductCard";
// import SpecialProduct from "../Components/SpecialProduct";
import Spinner from "../Components/Spinner";
import axios from "axios";

const Home = () => {
  const [plans, setPlans] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [products, setProducts] = useState([]);
  const [randomProducts, setRandomProducts] = useState([]);
  const token = JSON.parse(localStorage.getItem("auth"))?.token;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleClick = (plan) => {
    // Store the specific plan information in browser history and navigate to checkout page
    navigate("/subscription-payment", {
      state: { plan },
    });
  };

  useEffect(() => {
    const fetchSubscriptionPlans = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:5000/subscription-plan"
        );
        if (response.data.success) {
          setPlans(response.data.subscriptions);
        } else {
          throw new Error("Failed to fetch subscription plans");
        }
      } catch (error) {
        console.error("Error fetching subscription plans:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptionPlans();
  }, []);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        if (!token) {
          setSubscriptions([]);
          return;
        }
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const response = await axios.get("http://localhost:5000/subscription", {
          headers,
        });
        setSubscriptions(response.data.subscriptions);
      } catch (error) {
        console.error("Error fetching subscriptions:", error);
      }
    };
    fetchSubscriptions();
  }, [token]);

  // Check if the authenticated user has a subscription
  const auth = JSON.parse(localStorage.getItem("auth")) || {};
  const hasSubscription =
    auth.user &&
    subscriptions.some(
      (subscription) => subscription.userId === auth.user.userId
    );

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/products");
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      // Generate random indices
      const randomIndices = [];
      while (randomIndices.length < 8) {
        const randomIndex = Math.floor(Math.random() * products.length);
        if (!randomIndices.includes(randomIndex)) {
          randomIndices.push(randomIndex);
        }
      }

      // Select random products
      const randomProducts = randomIndices.map((index) => products[index]);
      setRandomProducts(randomProducts);
    }
  }, [products]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <Meta title={"Ecommex"} />
      <section className="home wrapper-1 py-4">
        <div className="container-fluid">
          <div className="row">
            {hasSubscription ? (
              <div className="col-12 p-0">
                <div className="position-relative">
                  <img
                    src="images/subscribed.png"
                    className="img-fluid rounded-3 w-100"
                    alt="main-banner"
                  />
                </div>
              </div>
            ) : (
              <>
                <div className="col-6">
                  <div className="main-banner position-relative">
                    <img
                      src="images/banner-1.jpg"
                      className="img-fluid rounded-3"
                      alt="small-banner"
                    />
                    <div className="main-banner-content position-absolute mx-3">
                      <h4>Empowering Startups</h4>
                      <h5>Ecommex</h5>
                      <p>
                        Where Resellers <br /> meets Wholesalers.
                      </p>
                      <Link className="button" to="/store">
                        EXPLORE
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="main-banner position-relative">
                    <img
                      src="images/banner-2.png"
                      className="img-fluid rounded-3"
                      alt="subscription-banner"
                    />
                    <div className="main-banner-content position-absolute mx-3">
                      <h4>Boost Success</h4>
                      <h5>
                        Ecommex <br /> Subscription
                      </h5>
                      <p>Save Time & Money</p>
                      {plans.map((plan, index) => (
                        <button
                          key={index}
                          className="button"
                          onClick={() => handleClick(plan)} // Pass the plan to handleClick
                        >
                          Subscribe Now
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
      <section className="home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="services d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-15">
                  <img src="images/service.png" alt="services" />
                  <div>
                    <h6>Free Shipping</h6>
                    <p className="mb-0">From all orders over PKR10,000</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                  <img src="images/service-02.png" alt="services" />
                  <div>
                    <h6>Daily Surprise Offers</h6>
                    <p className="mb-0">Save upto 25% off</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                  <img src="images/service-03.png" alt="services" />
                  <div>
                    <h6>Support 24/7</h6>
                    <p className="mb-0">Shop with an expert</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                  <img src="images/service-04.png" alt="services" />
                  <div>
                    <h6>Affordable Prices</h6>
                    <p className="mb-0">Get Factory Default Price</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                  <img src="images/service-05.png" alt="services" />
                  <div>
                    <h6>Secure Payments</h6>
                    <p className="mb-0">100% Protected Payment</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="justforyou-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 className="section-heading mb-3">Just For You</h3>
            </div>
            <ProductCard products={randomProducts} grid={3} />
          </div>
        </div>
      </section>
      {/* <section className="special-wrapper py-3 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 className="section-heading">Special Products</h3>
            </div>
          </div>
          <div className="row">
            <SpecialProduct />
            <SpecialProduct />
          </div>
        </div>
      </section> */}
    </>
  );
};

export default Home;
