import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Select } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import Dropzone from "react-dropzone";

const { Option } = Select;

const AddProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [minimumOrder, setminimumOrder] = useState("");
  const [price, setPrice] = useState({
    amount: "",
    currency: "PKR",
  });
  const [discountInPercent, setdiscountInPercent] = useState("0");
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
  const minOrder = (value) => {
    setminimumOrder(value);
  };
  const Status = (value) => {
    setStatus(value);
  };
  const Discount = (value) => {
    setdiscountInPercent(value);
  };
  const Price = (e) => {
    setPrice({
      ...price,
      amount: e.target.value,
    });
  };
  const Category = (value) => {
    setCategory(value);
  };
  const handleDrop = (acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setImages((prevImages) => [...prevImages, { url: reader.result }]);
      };
      reader.readAsDataURL(file);
    });
  };
  //Form Function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = JSON.parse(localStorage.getItem("auth"))?.token;

      if (!token) {
        throw new Error("Token not found");
      }

      const formData = new FormData();

      // Set the Authorization header with the token
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // Send the images to the server to store them in the database
      images.forEach((image) => {
        formData.append("images", image.url);
      });

      // Add other form data to the FormData object
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("discountInPercent", discountInPercent);
      formData.append("status", status);
      formData.append("category", category);
      formData.append("minimumOrder", minimumOrder);

      const res = await axios.post(`http://localhost:5000/products`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 200) {
        toast.success("Product Added Successfully");
      } else {
        console.log(res);
        toast.error(res.data);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // If the server returns a 401 error, display the error message
        toast.error(error.response.data.message);
      } else if (error.message === "Token not found") {
        // If the token is not found in local storage, display an error message
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
          <ReactQuill
            theme="snow"
            value={description}
            onChange={setDescription}
            name="description"
            placeholder="Enter Product Description"
            required
          />
        </div>
        <div>
          <p className="mb-0">Product Price:</p>
          <input
            type="number"
            value={price.amount}
            onChange={Price}
            name="price"
            placeholder="Enter Product Price"
            className="form-control"
            required
          />
          <input type="hidden" value={price.currency} name="currency" />
        </div>
        <div>
          <p className="mb-0">Product Discount:</p>
          <Select
            className="w-100"
            value={discountInPercent}
            onChange={Discount}
          >
            <Option value="0">0%</Option>
            <Option value="10">10%</Option>
            <Option value="25">25%</Option>
            <Option value="50">50%</Option>
            <Option value="75">75%</Option>
          </Select>
        </div>
        <div>
          <p className="mb-0">Select Product Status:</p>
          <Select
            mode="single"
            value={status}
            onChange={Status}
            name="status"
            className="w-100"
            placeholder="Select Status" // <-- Add placeholder here
          >
            <Option value="Active">Active</Option>
            <Option value="Inactive">InActive</Option>
          </Select>
        </div>
        <div>
          <p className="mb-0">Select Product Category:</p>
          <Select
            className="w-100"
            value={category} // Use selectedCategory state as the selected value
            onChange={Category} // Handle change event to update selectedCategory state
            name="category"
            placeholder="Select Category"
          >
            <Option value="Electronics">Electronics</Option>
            <Option value="Headphones">Headphones</Option>
          </Select>
        </div>
        <div>
          <p className="mb-0">Select Minimum Order Quantity:</p>
          <Select
            className="w-100"
            value={minimumOrder}
            onChange={minOrder}
            name="category"
            placeholder="Select Minimum Quantity"
          >
            <Option value="5">{"5"}</Option>
            <Option value="10">{"10"}</Option>
            <Option value="15">{"15"}</Option>
            <Option value="20">{"20"}</Option>
            <Option value="25">{"25"}</Option>
          </Select>
        </div>
        {images.length > 0 && (
          <div className="showimages d-flex flex-wrap gap-3">
            {images.map((image, index) => (
              <div className="position-relative" key={index}>
                <button
                  type="button"
                  onClick={() =>
                    setImages(images.filter((img) => img !== image))
                  }
                  className="btn-close position-absolute"
                  style={{ top: "10px", right: "10px" }}
                ></button>
                <img src={image.url} alt="" width={50} height={50} />
              </div>
            ))}
          </div>
        )}

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
        <button className="btn btn-success border-0 rounded-3 my-2">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
