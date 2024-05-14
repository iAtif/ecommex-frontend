import React, { useState, useEffect } from "react";
import BreadCrumb from "../Components/BreadCrumb";
import Meta from "../Components/Meta";
import { Link } from "react-router-dom";
import axios from "axios";
import Spinner from "../Components/Spinner";

const ProductTrack = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartProducts = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("auth"))?.token;
        if (!token) {
          throw new Error("Seller token not found");
        }
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const response = await axios.get(
          "http://localhost:5000/cart/cart-products",
          { headers }
        );
        setCartProducts(response.data.products);
        console.log(response.data.products);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cart products:", error);
        setLoading(false);
      }
    };

    fetchCartProducts();
  }, []);

  const removeFromCart = async (productId) => {
    try {
      const token = JSON.parse(localStorage.getItem("auth"))?.token;
      if (!token) {
        throw new Error("Seller token not found");
      }
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.delete(
        `http://localhost:5000/cart/remove/${productId}`,
        { headers }
      );
      console.log("Product removed from cart:", response.data);
    } catch (error) {
      console.error("Error removing product from cart:", error);
    }
  };

  const handleRemoveFromCart = async (productId) => {
    try {
      // Retrieve the authorization token from localStorage
      const token = JSON.parse(localStorage.getItem("auth"))?.token;
      if (!token) {
        throw new Error("Seller token not found");
      }
      // Include the token in the headers
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      // Call the remove from cart API endpoint
      await removeFromCart(productId, headers);

      // Fetch the updated cart data
      const updatedCartResponse = await axios.get(
        "http://localhost:5000/cart/cart-products",
        { headers }
      );

      // Set the updated cart products to the state
      setCartProducts(updatedCartResponse.data.products);

      // Optionally, perform any other actions after updating the cart
    } catch (error) {
      // Handle error
      console.error("Error updating cart after removing product:", error);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <Meta title={"Cart"} />
      <BreadCrumb items={[{ title: "Home", url: "/" }, { title: "Cart" }]} />
      <section className="cart-wrapper home-wrapper-2 py-3">
        <div className="container-fluid">
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
                  <div className="cart-header py-3 d-flex justify-content-between align-items-center">
                    <h4 className="cart-col-1">Product</h4>
                    <h4 className="cart-col-2">Price</h4>
                    <h4 className="cart-col-3">Quantity</h4>
                    <h4 className="cart-col-4">Total</h4>
                  </div>
                  {cartProducts.map((product) => (
                    <div
                      key={product._id}
                      className="cart-data mb-2 d-flex justify-content-between align-items-center"
                    >
                      <div className="cart-col-1 gap-15 d-flex align-items-center">
                        <div className="w-25">
                          <img
                            src={product.image}
                            className="img-fluid"
                            alt={product.name}
                          />
                        </div>
                        <div>
                          <p>{product.product.name}</p>
                          {/* Add other product details here */}
                        </div>
                      </div>
                      <div className="cart-col-2">
                        <h5 className="price">
                          Rs. {product.product.price.amount}
                        </h5>
                      </div>
                      {/* Add input field for quantity and delete button */}
                      <div className="cart-col-3 gap-10 d-flex align-items-center">
                        <div>
                          <input
                            type="number"
                            min={product.product.minimumOrder}
                            value={product.quantity}
                          />
                          <AiFillDelete
                            onClick={() =>
                              handleRemoveFromCart(product.product._id)
                            }
                            className="text-danger"
                          />
                        </div>
                      </div>
                      <div className="cart-col-4">
                        <h5 className="price">Rs. {product.total}</h5>
                      </div>
                    </div>
                  ))}
                  <div className="col-12 mt-4">
                    <div className="d-flex justify-content-between align-items-baseline">
                      <Link to="/store" className="button">
                        Continue to Shopping
                      </Link>
                      <div className="d-flex flex-column align-items-end">
                        {/* <h4>Subtotal: Rs. {subtotal}</h4> */}
                        <Link to="/checkout" className="button">
                          Checkout
                        </Link>
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

export default ProductTrack;
