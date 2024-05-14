import React, { useState, useEffect } from "react";
import Meta from "../Components/Meta";
import BreadCrumb from "../Components/BreadCrumb";
import toast from "react-hot-toast";
import axios from "axios";
import Spinner from "../Components/Spinner";
import { useNavigate } from "react-router-dom";

export const Wishlist = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("auth"))?.token;

        if (!token) {
          toast.error("Please login first");
          return;
        }
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const response = await axios.get("http://localhost:5000/favorite", {
          headers,
        });

        setFavorites(response.data.favorite.products);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching favorites:", error);
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const removeFromFavorites = async (productId) => {
    try {
      const token = JSON.parse(localStorage.getItem("auth"))?.token;
      if (!token) {
        toast.error("Please login first");
        return;
      }
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      // Send a DELETE request with productId in the request body
      await axios.put(`http://localhost:5000/favorite`, {
        headers,
        productId, // Pass productId in the request body
      });

      // Remove the product from the favorites list in the state
      setFavorites(favorites.filter((favorite) => favorite._id !== productId));

      toast.success("Product removed from Wishlist");
    } catch (error) {
      console.error("Error removing product from favorites:", error);
      toast.error("Failed to remove product from favorites");
    }
  };

  const handleBuyNow = (productId) => {
    navigate(`/store/${productId}`);
  };

  return (
    <>
      <Meta title={"Favourite"} />
      <BreadCrumb
        items={[{ title: "Home", url: "/" }, { title: "Favourite" }]}
      />
      <div className="wishlist-wrapper home-wrapper-2 py-3">
        <div className="container-fluid">
          <div className="row">
            {loading ? (
              <Spinner />
            ) : favorites && favorites.length === 0 ? (
              <h1 className="empty-wishlist">NO FAVORITES ITEMS FOUND</h1>
            ) : (
              favorites.map((favorite) => (
                <div key={favorite._id} className="col-3">
                  <div className="wishlist-card position-relative">
                    <div className="product-card-image">
                      <img src={favorite.images[0]} alt={favorite.name} />
                    </div>
                    <img
                      src="images/cross.svg"
                      alt="cross"
                      className="position-absolute cross img-fluid"
                      onClick={() => removeFromFavorites(favorite._id)}
                    />
                    <div className="wishlist-product-details">
                      <h5 className="title">{favorite.name}</h5>
                    </div>
                    <div>
                      <div className="product-details">
                        <h5 className="mb-0">Price:</h5>
                        <div className="d-flex gap-10 mb-0">
                          <p className="mb-0">
                            {favorite.price.currency} {favorite.payableAmount}
                          </p>
                          {favorite.discountInPercent !== 0 ? (
                            <p
                              className="mb-0"
                              style={{ textDecoration: "line-through" }}
                            >
                              {favorite.price.amount}
                            </p>
                          ) : null}
                        </div>
                      </div>
                      <div className="product-details">
                        <h5 className="mb-0">Min. Order Qty:</h5>
                        <p className="mb-0">{favorite.minimumOrder}</p>
                      </div>
                      <div className="product-details">
                        <h5 className="mb-0">Discount:</h5>
                        <p className="mb-0">{favorite.discountInPercent}%</p>
                      </div>
                    </div>
                    <div className="d-flex justify-content-center mt-2">
                      <button
                        className="button border-0"
                        onClick={() => handleBuyNow(favorite._id)}
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Wishlist;
