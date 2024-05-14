import React, { useState, useEffect } from "react";
import { Select } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import Dropzone from "react-dropzone";

const { Option } = Select;

const AddProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [currency] = useState("Rs.");
  const [discountInPercent, setDiscountInPercent] = useState("0");
  const [images, setImages] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const [status, setStatus] = useState("");
  const [minimumOrder, setMinimumOrder] = useState("");

  const [categories, setCategories] = useState([]);

  const handleMinOrderChange = (value) => {
    setMinimumOrder(value);
  };

  const handleStatusChange = (value) => {
    setStatus(value);
  };

  const handleDiscountChange = (e) => {
    const value = Math.max(0, Math.min(99, parseInt(e.target.value)));
    setDiscountInPercent(value.toString());
  };

  const handlePriceChange = (value) => {
    setPrice(value);
  };

  // Fetch Categories from Backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/categories");
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Error fetching categories");
      }
    };

    fetchCategories();
  }, []);

  const handleDrop = (acceptedFiles) => {
    setImages([...images, ...acceptedFiles]);
  };

  // Form Function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = JSON.parse(localStorage.getItem("auth"))?.token;

      if (!token) {
        throw new Error("Token not found");
      }

      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price.amount", price);
      formData.append("price.currency", currency);
      formData.append("discountInPercent", discountInPercent);
      formData.append("categoryId", categoryId);
      formData.append("status", status);
      formData.append("minimumOrder", minimumOrder);

      images.forEach((image, index) => {
        formData.append(`image${index}`, image);
      });

      const res = await axios.post(`http://localhost:5000/products`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 201) {
        // Check for correct status code
        toast.success("Product Added Successfully");
        // Reset form inputs
        setName("");
        setDescription("");
        setPrice("");
        setDiscountInPercent("0");
        setImages([]);
        setCategoryId(null);
        setStatus("");
        setMinimumOrder("");
      } else {
        console.log(res);
        toast.error("Failed to add product");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error(error.response.data.message);
      } else if (error.message === "Token not found") {
        toast.error("Please login again to add a product");
      } else {
        console.log(error);
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div>
      <h3 className="mb-4 title">Add Product</h3>
      <form onSubmit={handleSubmit} className="d-flex gap-3 flex-column">
        <div>
          <p className="mb-0">Product Title:</p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="name"
            placeholder="Enter Your Product Title"
            className="form-control"
            required
          />
        </div>
        <div>
          <p className="mb-0">Product Description:</p>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            name="description"
            placeholder="Enter Product Description"
            required
            className="form-control"
          />
        </div>
        <div>
          <p className="mb-0">Product Price:</p>
          <input
            type="number"
            value={price}
            onChange={(e) => handlePriceChange(e.target.value)}
            name="price"
            placeholder="Enter Product Price"
            className="form-control"
            required
          />
        </div>
        <div>
          <p className="mb-0">Product Discount (%):</p>
          <input
            type="number"
            value={discountInPercent}
            onChange={handleDiscountChange}
            min="0"
            max="99"
            placeholder="Enter Product Discount"
            className="form-control"
            required
          />
        </div>
        <div>
          <p className="mb-0">Select Product Status:</p>
          <Select
            mode="single"
            value={status}
            onChange={handleStatusChange}
            name="status"
            className="w-100"
            placeholder="Select Status"
          >
            <Option value="Active">Active</Option>
            <Option value="Inactive">Inactive</Option>
          </Select>
        </div>
        <div>
          <p className="mb-0">Select Product Category:</p>
          <Select
            className="w-100"
            value={categoryId}
            onChange={(value) => setCategoryId(value)}
            placeholder="Select Category"
          >
            {categories.map((category) => (
              <Option key={category._id} value={category._id}>
                {category.name}
              </Option>
            ))}
          </Select>
        </div>
        <div>
          <p className="mb-0">Select Minimum Order Quantity:</p>
          <Select
            className="w-100"
            value={minimumOrder}
            onChange={handleMinOrderChange}
            name="category"
            placeholder="Select Minimum Quantity"
          >
            <Option value="5">5</Option>
            <Option value="10">10</Option>
          </Select>
        </div>
        <div className="showimages d-flex flex-wrap gap-3">
          {images.map((image, index) => (
            <div className="position-relative" key={index}>
              <button
                type="button"
                onClick={() => setImages(images.filter((img) => img !== image))}
                className="btn-close position-absolute"
                style={{ top: "10px", right: "10px" }}
              ></button>
              <img
                src={URL.createObjectURL(image)}
                alt=""
                width={50}
                height={50}
              />
            </div>
          ))}
        </div>

        <Dropzone onDrop={handleDrop} className="w-100 mt-3">
          {({ getRootProps, getInputProps, isDragActive }) => {
            return (
              <div
                {...getRootProps()}
                className={`w-100 border border-1 p-3 rounded ${
                  isDragActive ? "bg-primary text-white" : ""
                }`}
              >
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p>Drop the files here ...</p>
                ) : (
                  <p>Drag and drop images here, or click to select images</p>
                )}
              </div>
            );
          }}
        </Dropzone>
        <button
          type="submit"
          className="btn btn-success border-0 rounded-3 my-2"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
