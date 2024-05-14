import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import BreadCrumb from "../Components/BreadCrumb";
import Meta from "../Components/Meta";
import ProductCard from "../Components/ProductCard";
import Spinner from "../Components/Spinner";
import axios from "axios";

const OurStore = () => {
  const location = useLocation();
  const [grid, setGrid] = useState(4);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortCriteria, setSortCriteria] = useState("all-products");
  const searchQuery = new URLSearchParams(location.search).get("search");
  //Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/categories");
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);
  //Fetch Total Products
  useEffect(() => {
    const fetchTotalProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/products");
        setProducts(response.data.products);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching total products:", error);
        setLoading(false);
      }
    };

    fetchTotalProducts();
  }, []);

  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
  };
  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
  };
  const handleCategoryOrSellerFilter = (selectedFilter) => {
    if (selectedFilter.type === "category") {
      setSelectedCategory(selectedFilter.value);
      setSelectedSeller(null); // Reset selected seller when a category is selected
    } else {
      setSelectedSeller(selectedFilter.value);
      setSelectedCategory(null); // Reset selected category when a seller is selected
    }
  };
  const handleReset = () => {
    if (selectedCategory !== null) {
      setSelectedCategory(null); // Reset the selected category
    }
    if (selectedSeller !== null) {
      setSelectedSeller(null); // Reset the selected seller
    }
  };
  useEffect(() => {
    const filterProducts = () => {
      let filtered = [...products];
      if (searchQuery) {
        filtered = filtered.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      // Filter by category
      if (selectedCategory) {
        filtered = filtered.filter((product) =>
          product.categoryId.name.includes(selectedCategory)
        );
      }
      // Filter by price range
      if (minPrice && maxPrice) {
        filtered = filtered.filter(
          (product) =>
            product.payableAmount >= parseFloat(minPrice) &&
            product.payableAmount <= parseFloat(maxPrice)
        );
      }
      // Filter by Selller Business
      if (selectedSeller) {
        filtered = products.filter(
          (product) => product.createdBy.businessName === selectedSeller
        );
      }
      // Sort filtered products
      if (sortCriteria === "title-ascending") {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
      } else if (sortCriteria === "title-descending") {
        filtered.sort((a, b) => b.name.localeCompare(a.name));
      } else if (sortCriteria === "price-ascending") {
        filtered.sort((a, b) => a.payableAmount - b.payableAmount);
      } else if (sortCriteria === "price-descending") {
        filtered.sort((a, b) => b.payableAmount - a.payableAmount);
      } else if (sortCriteria === "date-ascending") {
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      } else if (sortCriteria === "date-descending") {
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }
      setFilteredProducts(filtered);
    };

    filterProducts();
  }, [
    products,
    selectedCategory,
    minPrice,
    maxPrice,
    sortCriteria,
    searchQuery,
    selectedSeller,
  ]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <Meta title={"Our Store"} />
      <BreadCrumb
        items={[{ title: "Home", url: "/" }, { title: "Our Store" }]}
      />
      <div className="store-wrapper home-wrapper-2 py-5">
        <div className="container-fluid">
          <div className="row">
            <div className="col-3">
              <div className="filter-card mb-3">
                <h3 className="filter-title">Shop By Categories</h3>
                <div className="d-flex flex-row">
                  <ul className="ps-0">
                    {categories.map((category) => (
                      <li
                        className={
                          selectedCategory === category.name
                            ? "selectedCategory"
                            : ""
                        }
                        onClick={() =>
                          handleCategoryOrSellerFilter({
                            type: "category",
                            value: category.name,
                          })
                        }
                        key={category._id}
                      >
                        {category.name}
                      </li>
                    ))}
                  </ul>
                </div>
                <h3 className="filter-title">Shop By Seller</h3>
                <div className="d-flex flex-row">
                  <ul className="ps-0">
                    {/* Map through unique business names and display them */}
                    {Array.from(
                      new Set(
                        products.map(
                          (product) => product.createdBy.businessName
                        )
                      )
                    ).map((name, index) => (
                      <li
                        className={
                          selectedSeller === name ? "selectedSeller" : ""
                        }
                        onClick={() =>
                          handleCategoryOrSellerFilter({
                            type: "seller",
                            value: name,
                          })
                        }
                        key={index}
                      >
                        {name}
                      </li>
                    ))}
                  </ul>
                </div>
                {(selectedCategory !== null || selectedSeller !== null) && (
                  <div className="d-flex justify-content-center">
                    <button className="button p-2" onClick={handleReset}>
                      Reset
                    </button>
                  </div>
                )}
              </div>
              <div className="filter-card mb-3">
                <h3 className="filter-title">Price</h3>
                <div className="d-flex align-items-center gap-10">
                  <div className="form-floating">
                    <input
                      type="number"
                      className="form-control"
                      id="fromInput"
                      placeholder="From"
                      value={minPrice}
                      onChange={handleMinPriceChange}
                    />
                    <label htmlFor="fromInput">From</label>
                  </div>
                  <div className="form-floating">
                    <input
                      type="number"
                      className="form-control"
                      id="toInput"
                      placeholder="To"
                      value={maxPrice}
                      onChange={handleMaxPriceChange}
                    />
                    <label htmlFor="toInput">To</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-9">
              <div className="filter-sort-grid mb-4">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center gap-10">
                    <p className="mb-0 d-block" style={{ width: "100px" }}>
                      Sort By:
                    </p>
                    <select
                      name="sortSelect"
                      className="form-control form-select"
                      id="sortSelect"
                      value={sortCriteria}
                      onChange={(e) => setSortCriteria(e.target.value)}
                    >
                      <option value="all-products">All Products</option>
                      <option value="title-ascending">
                        Alphabetically, A-Z
                      </option>
                      <option value="title-descending">
                        Alphabetically, Z-A
                      </option>
                      <option value="price-ascending">
                        Price, Low to High
                      </option>
                      <option value="price-descending">
                        Price, High to Low
                      </option>
                      <option value="date-ascending">Date, Old to New</option>
                      <option value="date-descending">Date, New to Old</option>
                    </select>
                  </div>
                  <div className="d-flex align-items-center gap-10">
                    <p className="totalproducts mb-0">
                      {filteredProducts.length} Products
                    </p>
                    <div className="d-flex gap-10 align-items-center grid">
                      <img
                        onClick={() => {
                          setGrid(3);
                        }}
                        src="images/gr4.svg"
                        alt="grid"
                        className={`d-block img-fluid ${
                          grid === 3 ? "active" : ""
                        }`}
                      />
                      <img
                        onClick={() => {
                          setGrid(4);
                        }}
                        src="images/gr3.svg"
                        alt="grid"
                        className={`d-block img-fluid ${
                          grid === 4 ? "active" : ""
                        }`}
                      />
                      <img
                        onClick={() => {
                          setGrid(6);
                        }}
                        src="images/gr2.svg"
                        alt="grid"
                        className={`d-block img-fluid ${
                          grid === 6 ? "active" : ""
                        }`}
                      />
                      <img
                        onClick={() => {
                          setGrid(12);
                        }}
                        src="images/gr.svg"
                        alt="grid"
                        className={`d-block img-fluid ${
                          grid === 12 ? "active" : ""
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="products-list">
                <div className="d-flex gap-10 flex-wrap">
                  <ProductCard products={filteredProducts} grid={grid} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OurStore;
