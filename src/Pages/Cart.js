import React, { useState, useEffect } from "react";
import BreadCrumb from "../Components/BreadCrumb";
import Meta from "../Components/Meta";
import { Link, useNavigate } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";
import Spinner from "../Components/Spinner";
import toast from "react-hot-toast";

const Cart = () => {
  const navigate = useNavigate();
  const [cartProducts, setCartProducts] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartProducts = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("auth"))?.token;
        if (!token) {
          throw new Error("User token not found");
        }
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const response = await axios.get("http://localhost:5000/cart", {
          headers,
        });
        const products = response.data.cart.products;
        setCartProducts(products);
        calculateSubtotal(products);
      } catch (error) {
        console.error("Error fetching cart products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartProducts();
  }, []);

  const calculateSubtotal = (products) => {
    const total = products.reduce((acc, products) => {
      const productTotal = products.product.payableAmount * products.quantity;
      return acc + productTotal;
    }, 0);
    setSubtotal(total);
  };

  const removeFromCart = async (productId) => {
    try {
      const token = JSON.parse(localStorage.getItem("auth"))?.token;
      if (!token) {
        throw new Error("User token not found");
      }
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.delete(
        `http://localhost:5000/cart/remove/${productId}`,
        {
          headers,
        }
      );
      const updatedProducts = response.data.cart.products;
      setCartProducts(updatedProducts);
      calculateSubtotal(updatedProducts);
      toast.success("Product removed from Cart");
    } catch (error) {
      console.error("Error removing product from cart:", error);
    }
  };

  const handleQuantityChange = (productId, newQuantity) => {
    const updatedProducts = cartProducts.map((products) => {
      if (products.product._id === productId) {
        return { ...products, quantity: newQuantity };
      }
      return products;
    });
    setCartProducts(updatedProducts);
    calculateSubtotal(updatedProducts);
  };

  const handleCheckout = () => {
    navigate("/cart-checkout", {
      state: { cartProducts, totalAmount: subtotal },
    });
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <Meta title={"Cart"} />
      <BreadCrumb items={[{ title: "Home", url: "/" }, { title: "Cart" }]} />
      <section className="cart-wrapper home-wrapper-2 py-3">
        <div className="container-fluid px-5">
          <div className="row">
            <div className="col-12">
              {cartProducts.length === 0 ? (
                <>
                  <h1 className="empty-cart">EMPTY CART</h1>
                  <Link to="/store" className="button">
                    Continue to Shopping
                  </Link>
                </>
              ) : (
                <>
                  <div className="cart-header py-2 d-flex justify-content-between align-items-center">
                    <h4 className="cart-col-1">Products</h4>
                    <h4 className="cart-col-2">Price</h4>
                    <h4 className="cart-col-3">Quantity</h4>
                    <h4 className="cart-col-4">Total</h4>
                  </div>
                  {cartProducts.map((products) => (
                    <div
                      key={products.product._id}
                      className="cart-data mb-3 d-flex justify-content-between align-items-center"
                    >
                      <div className="cart-col-1 gap-15 d-flex align-items-center">
                        <div>
                          <img
                            src={products.product.images[0]}
                            className="img-fluid"
                            alt={products.product.name}
                          />
                        </div>
                        <div>
                          <p>{products.product.name}</p>
                        </div>
                      </div>
                      <div className="cart-col-2">
                        <h5 className="price">
                          Rs. {products.product.payableAmount}
                        </h5>
                      </div>
                      <div className="cart-col-3">
                        <div className="d-flex align-items-center gap-10">
                          <input
                            type="number"
                            min={products.product.minimumOrder}
                            max={100}
                            value={products.quantity}
                            onChange={(e) =>
                              handleQuantityChange(
                                products.product._id,
                                parseInt(e.target.value)
                              )
                            }
                            className="form-control"
                            style={{ width: "70px" }}
                          />
                          <AiFillDelete
                            onClick={() => removeFromCart(products.product.id)}
                            className="text-danger"
                          />
                        </div>
                      </div>
                      <div className="cart-col-4">
                        <h5 className="price">
                          Rs.{" "}
                          {products.product.payableAmount * products.quantity}
                        </h5>
                      </div>
                    </div>
                  ))}
                  <div className="col-12 mt-4">
                    <div className="d-flex justify-content-between align-items-baseline">
                      <Link to="/store" className="button">
                        Continue to Shopping
                      </Link>
                      <div className="d-flex flex-column align-items-end">
                        <h4>Subtotal: Rs. {subtotal}</h4>
                        <button
                          className="button mt-2"
                          onClick={handleCheckout}
                        >
                          Checkout
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
