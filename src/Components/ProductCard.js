import React from "react";
import { Link, useLocation } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import compare from "../images/prodcompare.svg";
import wish from "../images/wish.svg";
import view from "../images/view.svg";
import cart from "../images/add-cart.svg";
import toast from "react-hot-toast";
import axios from "axios";

const ProductCard = ({ products, grid }) => {
  let location = useLocation();

  // Handle adding a product to favorites
  const handleAddToFavorites = async (event, productId) => {
    event.preventDefault();
    try {
      const token = JSON.parse(localStorage.getItem("auth"))?.token;
      if (!token) {
        toast.error("Please login first");
        return;
      }
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.post(
        "http://localhost:5000/favorite",
        { productId },
        { headers }
      );
      if (response.data.success) {
        toast.success("Product added to Wishlist");
      }
    } catch (error) {
      console.error("Error adding product to favorites:", error);
      toast.error("Failed to add product to Favorites");
    }
  };
  // Handle compare icon click
  const handleCompareClick = (event, product) => {
    event.preventDefault();
    const token = JSON.parse(localStorage.getItem("auth"))?.token;
    if (!token) {
      toast.error("Please login first");
      return;
    }
    const storedProducts =
      JSON.parse(localStorage.getItem("compareProducts")) || [];
    if (storedProducts.length >= 4) {
      toast.error("You can compare up to 4 products");
      return;
    }
    const updatedProducts = [...storedProducts, product];
    localStorage.setItem("compareProducts", JSON.stringify(updatedProducts));
    toast.success("Product Added to Compare List");
  };

  const handleAddToCart = async (event, productId) => {
    event.preventDefault();
    try {
      const token = JSON.parse(localStorage.getItem("auth"))?.token;
      if (!token) {
        toast.error("Please login first");
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const userId = JSON.parse(localStorage.getItem("auth"))?.user.userId;

      const productResponse = await axios.get(
        `http://localhost:5000/products/${productId}`
      );

      if (!productResponse.data.success) {
        throw new Error("Failed to fetch product details");
      }

      const { minimumOrder } = productResponse.data.product;

      const response = await axios.post(
        "http://localhost:5000/cart/add",
        { productId, userId, quantity: minimumOrder },
        { headers }
      );

      if (response.data.success) {
        toast.success("Product added to Cart");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error("Failed to add product to Cart");
    }
  };

  return (
    <>
      {Array.isArray(products) && products.length > 0 ? (
        products.map((product) => (
          <div
            key={product._id}
            className={` ${
              location.pathname === "/store" ? `gr-${grid}` : "col-3"
            } `}
          >
            <Link
              to={`/store/${product._id}`}
              className="product-card position-relative"
            >
              <div className="product-image">
                {product.images.map((image, index) => (
                  <img
                    key={index}
                    src={`${image}`}
                    alt={`product ${index + 1}`}
                  />
                ))}
              </div>
              <div className="product-details">
                <h5
                  className="product-title mb-0"
                  style={{
                    maxWidth: "100%",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {product.name}
                </h5>
                <p
                  className={`description ${
                    grid === 12 ? "d-block" : "d-none"
                  }`}
                >
                  {product.description}
                </p>
                {product.discountInPercent === 0 ? (
                  <>
                    <p className="price m-0">
                      {product.price.currency} {product.payableAmount}
                    </p>
                    <p className="minOrder m-0">
                      Min. order: {product.minimumOrder} pieces
                    </p>
                    <div className="d-flex align-items-center">
                      <p className="discount m-0 text-white">
                        {product.price.currency} {product.price.amount}
                      </p>
                      <p className="discount-percent m-0 text-white">
                        -{product.discountInPercent}%
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="price m-0">
                      {product.price.currency} {product.payableAmount}
                    </p>
                    <div className="d-flex align-items-center">
                      <p className="discount m-0">
                        {product.price.currency} {product.price.amount}
                      </p>
                      <p className="discount-percent m-0">
                        -{product.discountInPercent}%
                      </p>
                    </div>
                    <p className="minOrder m-0">
                      Min. order: {product.minimumOrder} pieces
                    </p>
                  </>
                )}
                <ReactStars
                  count={5}
                  size={20}
                  value={product.averageRating}
                  edit={false}
                  activeColor="#ffd700"
                />
                <h6 className="store mb-0">{product.createdBy.businessName}</h6>
              </div>
              <div className="action-bar position-absolute">
                <div className="d-flex flex-column gap-15">
                  <div
                    className="icon-container"
                    onClick={(event) =>
                      handleAddToFavorites(event, product._id)
                    }
                  >
                    <img src={wish} alt="wishlist" />
                  </div>
                  <div
                    className="icon-container"
                    onClick={(event) => handleCompareClick(event, product)}
                  >
                    <img src={compare} alt="compare" />
                  </div>
                  <div
                    className="icon-container"
                    onClick={(event) => handleAddToCart(event, product._id)}
                  >
                    <img src={cart} alt="addcart" />
                  </div>
                  <div className="icon-container">
                    <img src={view} alt="view" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))
      ) : (
        <div>
          <h1 className="empty-cart">NO PRODUCTS FOUND</h1>
        </div>
      )}
    </>
  );
};

export default ProductCard;
