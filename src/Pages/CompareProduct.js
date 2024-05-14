import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Meta from "./../Components/Meta";
import BreadCrumb from "./../Components/BreadCrumb";
import { toast } from "react-toastify";

const CompareProduct = () => {
  const navigate = useNavigate();
  const [comparedProducts, setComparedProducts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("auth");
    if (!token) {
      // Redirect user to login page with toast message
      toast.error("Please Login");
      navigate("/login"); // Change the path to your login page
    } else {
      // Retrieve compared products from local storage
      const storedProducts =
        JSON.parse(localStorage.getItem("compareProducts")) || [];
      setComparedProducts(storedProducts);
    }
  }, [navigate]);

  const removeProduct = (index) => {
    const updatedProducts = [...comparedProducts];
    updatedProducts.splice(index, 1);
    if (updatedProducts.length === 0) {
      localStorage.removeItem("compareProducts");
    } else {
      localStorage.setItem("compareProducts", JSON.stringify(updatedProducts));
    }
    setComparedProducts(updatedProducts);
  };

  const goToProductPage = (productId) => {
    navigate(`/store/${productId}`);
  };
  return (
    <>
      <Meta title={"Compare Products"} />
      <BreadCrumb
        items={[{ title: "Home", url: "/" }, { title: "Compare Products" }]}
      />
      <div className="compare-product-wrapper home-wrapper-2 py-3">
        <div className="container-fluid">
          <div className="row">
            {comparedProducts.length === 0 ? (
              <h1 className="empty-compare">EMPTY COMPARE LIST</h1>
            ) : (
              comparedProducts.map((product, index) => (
                <div className="col-3" key={index}>
                  <div className="compare-product-card position-relative">
                    <div className="product-card-image">
                      <img src={product.images[0]} alt="product" />
                    </div>
                    <img
                      src="images/cross.svg"
                      alt="cross"
                      className="position-absolute cross img-fluid"
                      onClick={() => removeProduct(index)}
                    />
                    <div
                      className="compare-product-details mt-2 cursor"
                      onClick={() => goToProductPage(product._id)}
                    >
                      <h5 className="title">{product.name}</h5>
                    </div>
                    <div>
                      <div className="product-details">
                        <h5 className="mb-0">Store:</h5>
                        <p className="mb-0">{product.createdBy.businessName}</p>
                      </div>
                      <div className="product-details">
                        <h5 className="mb-0">Category:</h5>
                        <p className="mb-0">{product.categoryId.name}</p>
                      </div>
                      <div className="product-details">
                        <h5 className="mb-0">Min. Order Qty:</h5>
                        <p className="mb-0">{product.minimumOrder}</p>
                      </div>
                      <div className="product-details">
                        <h5 className="mb-0">Discount:</h5>
                        <p className="mb-0">{product.discountInPercent}%</p>
                      </div>
                      <div className="product-details">
                        <h5 className="mb-0">Price:</h5>
                        <div className="d-flex gap-10 mb-0">
                          <p className="mb-0">
                            {product.price.currency} {product.payableAmount}
                          </p>
                          {product.discountInPercent !== 0 ? (
                            <p
                              className="mb-0"
                              style={{ textDecoration: "line-through" }}
                            >
                              {product.price.amount}
                            </p>
                          ) : null}
                        </div>
                      </div>
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

export default CompareProduct;
