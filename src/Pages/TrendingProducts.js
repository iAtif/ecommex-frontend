import React, { useState, useEffect } from "react";
import BreadCrumb from "../Components/BreadCrumb";
import Meta from "../Components/Meta";
import ProductCard from "../Components/ProductCard";
import Spinner from "../Components/Spinner";
import axios from "axios";

const TrendingProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingProducts = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("auth")).token;
        const response = await axios.get(
          "http://localhost:5000/products/top-trending?limit=4",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.success) {
          setProducts(response.data.product);
          setLoading(false);
        } else {
          throw new Error("Failed to fetch trending products");
        }
      } catch (error) {
        console.error("Error fetching trending products:", error);
        setLoading(false);
      }
    };

    fetchTrendingProducts();
  }, []);

  return (
    <>
      <Meta title={"Trending Products"} />
      <BreadCrumb
        items={[{ title: "Home", url: "/" }, { title: "Trending Products" }]}
      />
      <div className="store-wrapper home-wrapper-2 py-5">
        <div className="container-fluid px-5">
          <div className="row">
            {loading ? (
              <Spinner />
            ) : (
              <ProductCard products={products} grid={3} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TrendingProducts;
