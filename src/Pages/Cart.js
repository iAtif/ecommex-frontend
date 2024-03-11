import React from "react";
import BreadCrumb from "../Components/BreadCrumb";
import Meta from "../Components/Meta";
import { Link } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";

const Cart = () => {
  return (
    <>
      <Meta title={"Cart"} />
      <BreadCrumb title="Cart" />
      <section className="cart-wrapper home-wrapper-2 py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="cart-header py-3 d-flex justify-content-between align-items-center">
                <h4 className="cart-col-1">Product</h4>
                <h4 className="cart-col-2">Price</h4>
                <h4 className="cart-col-3">Quantity</h4>
                <h4 className="cart-col-4">Total</h4>
              </div>
              <div className="cart-data mb-2 d-flex justify-content-between align-items-center">
                <div className="cart-col-1 gap-15 d-flex align-item-center">
                  <div className="w-25">
                    <img
                      src="images/watch.jpg"
                      className="img-fluid"
                      alt="watch"
                    />
                  </div>
                  <div>
                    <p>fhddh</p>
                    <p>Size: dddd</p>
                    <p>Color: ghfh</p>
                  </div>
                </div>
                <div className="cart-col-2">
                  <h5 className="price">Rs. 100</h5>
                </div>
                <div className="cart-col-3 gap-10 d-flex align-items-center">
                  <div>
                    <input
                      className="form-control"
                      type="number"
                      name=""
                      defaultValue="1"
                      min={1}
                      max={10}
                      id=""
                    />
                  </div>
                  <div>
                    <AiFillDelete className="text-danger" />
                  </div>
                </div>
                <div className="cart-col-4">
                  <h5 className="price">Rs. 100</h5>
                </div>
              </div>
            </div>
            <div className="col-12 mt-4">
              <div className="d-flex justify-content-between align-items-baseline">
                <Link to="/products" className="button">
                  Continue to Shopping
                </Link>
                <div className="d-flex flex-column align-items-end">
                  <h4>Subtotal: Rs. 1000</h4>
                  <p>Shipping will be calculated at Checkout</p>
                  <Link to="/checkout" className="button">
                    Checkout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
