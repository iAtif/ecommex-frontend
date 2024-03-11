import React, { useState } from "react";
import { Link } from "react-router-dom";

const AddProduct = (props) => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    quantity: "",
  });

  const handleChange = (event) => {
    if (event.target.name === "quantity" && event.target.value >= 5) {
      setProduct({ ...product, [event.target.name]: event.target.value });
    } else if (event.target.name !== "quantity") {
      setProduct({ ...product, [event.target.name]: event.target.value });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.addProduct(product);
    setProduct({ name: "", price: "", quantity: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex flex-column gap-15">
      <div>
        <input
          type="text"
          value={product.name}
          onChange={handleChange}
          name="name"
          placeholder="Product Name"
          className="form-control"
          required
        />
      </div>
      <div>
        <input
          type="number"
          value={product.price}
          onChange={handleChange}
          name="price"
          placeholder="Product Price"
          className="form-control"
          required
        />
      </div>
      <div>
        <input
          type="number"
          value={product.quantity}
          onChange={handleChange}
          name="quantity"
          placeholder="Product Quantity"
          className="form-control"
          required
        />
      </div>
      <Link variant="primary" type="submit">
        Add Product
      </Link>
    </form>
  );
};

export default AddProduct;
