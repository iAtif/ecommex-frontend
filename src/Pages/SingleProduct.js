import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import BreadCrumb from "../Components/BreadCrumb";
import Meta from "../Components/Meta";
import ProductCard from "../Components/ProductCard";
import ReactStars from "react-rating-stars-component";
import Spinner from "../Components/Spinner";
import { toast } from "react-hot-toast";
import { BsChatLeftDots } from "react-icons/bs";
import axios from "axios";

const SingleProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(false);

  // Fetch Product and Reviews
  useEffect(() => {
    const fetchProductAndReviews = async () => {
      try {
        const productResponse = await axios.get(
          `http://localhost:5000/products/${id}`
        );
        setProduct(productResponse.data.product);
        window.scrollTo(0, 0);
        setQuantity(0);
        setSelectedImage(productResponse.data.product.images[0]);

        const reviewResponse = await axios.get(
          `http://localhost:5000/products/${id}/review`
        );
        setReviews(reviewResponse.data.product.reviews);
      } catch (error) {
        console.error("Error fetching product or reviews:", error);
      }
    };

    fetchProductAndReviews();
  }, [id]);

  // Fetch Recommended Product
  useEffect(() => {
    const fetchRecommendedProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/products/${id}/recommended-products`
        );
        if (response.data.success) {
          setProducts(response.data.products);
          setLoading(false);
        } else {
          throw new Error("Failed to fetch recommended products");
        }
      } catch (error) {
        console.error("Error fetching recommended products:", error);
        setLoading(false);
      }
    };

    fetchRecommendedProducts();
  }, [id]);

  const handleWriteReviewClick = () => {
    setShowReviewForm(true);
  };

  // Calculate total amount based on quantity and payable amount
  useEffect(() => {
    if (product) {
      setTotalAmount(product.payableAmount * quantity);
    }
  }, [quantity, product]);

  const handleBuyNow = () => {
    if (quantity === 0 || quantity < product.minimumOrder) {
      toast.error(
        `Quantity must be greater or equal to ${product.minimumOrder}`
      );
      return;
    }
    // Store the product information in browser history and navigate to checkout page
    navigate("/checkout-information", {
      state: { product, totalAmount, quantity },
    });
  };

  const handleSubmitReview = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const token = JSON.parse(localStorage.getItem("auth"))?.token;

      if (!token) {
        throw new Error("Token not found");
      }

      const response = await axios.post(
        `http://localhost:5000/products/${id}/review`,
        { rating, comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        toast.success("Review submitted successfully.");
        setRating(0);
        setComment("");
        window.location.reload();
      } else {
        toast.error("Failed to submit review.");
      }
    } catch (error) {
      toast.error("Failed to submit review.");
      console.error("Error submitting review:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChatWithSeller = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem("auth"))?.user?.userId;

      // Check if there is an existing chat between the seller and the wholesaler
      const response = await axios.get(
        `http://localhost:5000/chat/find/${userId}/${product.createdBy._id}`
      );

      let chatId = null;

      if (response.data) {
        // If chat exists, get the chat ID
        chatId = response.data._id;
      } else {
        // If chat does not exist, create a new chat
        const createChatResponse = await axios.post(
          `http://localhost:5000/chat`,
          {
            senderId: userId,
            receiverId: product.createdBy._id,
          }
        );

        if (createChatResponse.data) {
          chatId = createChatResponse.data._id;
        }
      }

      if (chatId) {
        navigate(`/chat/${chatId}`, {
          state: {
            productName: product.name,
            sellerName: product.createdBy.businessName,
            productId: product.id,
            receiverId: product.createdBy._id,
          },
        });
      } else {
        toast.error("Failed to initiate chat.");
      }
    } catch (error) {
      console.error("Error initiating chat:", error);
      toast.error("Failed to initiate chat.");
    }
  };

  if (!product) {
    return <Spinner />;
  }

  return (
    <>
      <Meta title={product.name} />
      <BreadCrumb
        items={[
          { title: "Home", url: "/" },
          { title: "Our Store", url: "/store" },
          { title: product.name },
        ]}
      />
      <div className="main-product-wrapper py-5 home-wrapper-2">
        <div className="container-fluid px-5">
          <div className="row">
            <div className="col-6">
              <div className="main-product-image">
                <div>
                  {selectedImage && (
                    <img
                      src={`${selectedImage}`}
                      className="img-fluid"
                      alt={`prd`}
                    />
                  )}
                </div>
              </div>
              <div className="other-product-images d-flex flex-wrap gap-15 mt-2">
                {product.images.map((image, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedImage(image)}
                    className={`image-wrapper ${
                      selectedImage === image ? "selected" : ""
                    }`}
                  >
                    <img
                      src={image}
                      className="img-fluid"
                      alt={`prd-${index}`}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="col-6">
              <div className="main-product-details">
                <div className="border-bottom">
                  <h3 className="title">{product.name}</h3>
                </div>
                <div className="border-bottom py-3">
                  <p className="price mb-0">
                    {product.price.currency} {product.payableAmount}
                  </p>
                </div>
                <div className="border-bottom">
                  <div className="d-flex gap-10 align-items-center my-2">
                    <h3 className="product-heading">Discount:</h3>
                    <p className="product-data">{product.discountInPercent}%</p>
                  </div>
                  <div className="d-flex gap-10 align-items-center my-2">
                    <h3 className="product-heading">Soldy By:</h3>
                    <p className="product-data">
                      {product.createdBy.businessName}
                    </p>
                  </div>
                  <div className="d-flex gap-10 align-items-center my-2">
                    <h3 className="product-heading">Category :</h3>
                    <p className="product-data">{product.categoryId.name}</p>
                  </div>
                  <div className="d-flex gap-10 align-items-center my-2">
                    <h3 className="product-heading">Minimum Order:</h3>
                    <p className="product-data">
                      {product.minimumOrder} pieces
                    </p>
                  </div>
                  <div className="d-flex gap-10 align-items-center my-2">
                    <h3 className="product-heading">Availability:</h3>
                    <p className="product-data">In Stock</p>
                  </div>
                  <div className="d-flex align-items-center gap-15 flex-row mt-2 mb-3">
                    <h3 className="product-heading">Quantity :</h3>
                    <div className="">
                      <input
                        type="number"
                        name=""
                        min={product.minimumOrder}
                        max={100}
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="form-control"
                        style={{ width: "70px" }}
                        id=""
                      />
                    </div>
                    <div className="d-flex align-item-center gap-30 ms-5">
                      <button className="button border-0">Add to Cart</button>
                      <button className="button signup" onClick={handleBuyNow}>
                        Buy Now
                      </button>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <Link onClick={handleChatWithSeller}>
                      <BsChatLeftDots />
                      Chat with Seller
                    </Link>
                    <div className="d-flex align-items-center">
                      <h3 className="product-heading fs-6 me-2">
                        Total Amount:
                      </h3>
                      <p className="product-data fs-6 mb-0">
                        {product.price.currency} {totalAmount}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="description-wrapper py-5 home-wrapper-2">
        <div className="container-fluid px-5">
          <div className="row">
            <div className="col-12">
              <h4>Description</h4>
              <div className="description-inner-wrapper">
                <p className="mb-0">{product.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="reviews-wrapper home-wrapper-2">
        <div className="container-fluid px-5">
          <div className="row">
            <div className="col-12">
              <h3>Reviews</h3>
              <div className="review-inner-wrapper">
                <div className="review-head d-flex justify-content-between align-items-end">
                  <div>
                    <h4 className="mb-2">Customer Reviews</h4>
                    <div className="d-flex align-items-center gap-10">
                      <ReactStars
                        count={5}
                        size={24}
                        value={product.averageRating}
                        edit={false}
                        activeColor="#ffd700"
                      />
                      <p className="mb-0">Based on {reviews.length} Reviews</p>
                    </div>
                  </div>
                  <div>
                    {localStorage.getItem("auth") && (
                      <button
                        className="button border-0"
                        onClick={handleWriteReviewClick}
                      >
                        Write a Review
                      </button>
                    )}
                  </div>
                </div>
                {showReviewForm && (
                  <div className="review-form py-4">
                    <h4 className="mb-2">Write a Review</h4>
                    <form
                      onSubmit={handleSubmitReview}
                      className="d-flex flex-column gap-15"
                    >
                      <div className="d-flex gap-10 align-items-center">
                        <h5 className="mb-1 mt-2">Select Product Rating:</h5>
                        <ReactStars
                          count={5}
                          size={24}
                          value={rating}
                          onChange={setRating}
                          edit={true}
                          activeColor="#ffd700"
                        />
                      </div>
                      <div>
                        <h5 className="mb-2">Add Written Review:</h5>
                        <textarea
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          className="w-100 form-control"
                          cols="30"
                          rows="4"
                          placeholder="Comments"
                          required
                        ></textarea>
                      </div>
                      <div className="d-flex justify-content-end">
                        <button
                          type="submit"
                          className="button border-0"
                          disabled={loading}
                        >
                          {loading ? "Submitting..." : "Submit Review"}
                        </button>
                      </div>
                    </form>
                  </div>
                )}
                {reviews.length > 0 ? (
                  reviews.map((review, index) => (
                    <div key={index} className="review">
                      <div className="d-flex gap-10 align-items-center">
                        <h6 className="mb-0">
                          {review.user.firstName} {review.user.lastName}
                        </h6>
                        <ReactStars
                          count={5}
                          size={24}
                          value={review.rating}
                          edit={false}
                          activeColor="#ffd700"
                        />
                      </div>
                      <p className="mt-1">{review.comment}</p>
                    </div>
                  ))
                ) : (
                  <div className="review">
                    <div className="d-flex gap-10 align-items-center">
                      <h6 className="mt-3">No Reviews</h6>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="popular-wrapper py-5 home-wrapper-2">
        <div className="container-fluid px-5">
          <div className="row">
            <div className="col-12">
              <h3 className="section-heading">You May Also Like</h3>
            </div>
          </div>
          <div className="row">
            <ProductCard products={products} grid={3} />
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleProduct;
