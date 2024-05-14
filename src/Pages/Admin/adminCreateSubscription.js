import React, { useState } from "react";
import { Select } from "antd";
import axios from "axios";
import toast from "react-hot-toast";

const { Option } = Select;

const CreateSubscription = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [currency] = useState("Rs.");
  const [durationInMonths, setDurationInMonths] = useState("0");
  const [features, setFeatures] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = JSON.parse(localStorage.getItem("auth"))?.token;

      if (!token) {
        throw new Error("Token not found");
      }

      const requestData = {
        name,
        description,
        price: {
          amount,
          currency,
        },
        durationInMonths,
        features: features.split("\n").map((feature) => feature.trim()),
      };

      // Make a POST request to your backend API to create a new subscription
      const response = await axios.post(
        "http://localhost:5000/subscription-plan",
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Set content type to JSON
          },
        }
      );

      if (response.status === 201) {
        // Subscription plan created successfully
        toast.success("Subscription plan added successfully");
        // Reset form fields
        setName("");
        setDescription("");
        setAmount("");
        setDurationInMonths("0");
        setFeatures([]);
      } else {
        // Handle other response statuses (if necessary)
        console.log(response);
        toast.error("Failed to add subscription plan");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error(error.response.data.message);
      } else if (error.message === "Token not found") {
        toast.error("Please log in again to add a subscription plan");
      } else {
        console.error(error);
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div>
      <h3 className="mb-4 title">Create Subscription Plan</h3>
      <form onSubmit={handleSubmit} className="d-flex gap-3 flex-column">
        {/* Input fields for subscription details */}
        {/* Subscription Name */}
        <div>
          <p className="mb-0">Subscription Name:</p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="name"
            placeholder="Enter Subscription Name"
            className="form-control"
            required
          />
        </div>
        {/* Subscription Description */}
        <div>
          <p className="mb-0">Subscription Description:</p>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            name="description"
            placeholder="Enter Subscription Description"
            required
            className="form-control"
          />
        </div>
        {/* Subscription Price */}
        <div>
          <p className="mb-0">Subscription Price:</p>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            name="price"
            placeholder="Enter Subscription Price"
            className="form-control"
            required
          />
        </div>
        {/* Subscription Duration */}
        <div>
          <p className="mb-0">Subscription Duration:</p>
          <Select
            className="w-100"
            value={durationInMonths}
            onChange={(value) => setDurationInMonths(value)}
          >
            <Option value="0">0 Months</Option>
            <Option value="1">1 Month</Option>
            <Option value="3">3 Months</Option>
            <Option value="6">6 Months</Option>
            {/* Add more options as needed */}
          </Select>
        </div>
        <div>
          <p className="mb-0">Subscription Features (One per line):</p>
          <textarea
            value={features}
            onChange={(e) => setFeatures(e.target.value)}
            name="features"
            placeholder="Enter Subscription Features (One per line)"
            className="form-control"
            required
          />
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-success border-0 rounded-3 my-2"
        >
          Add Subscription Plan
        </button>
      </form>
    </div>
  );
};

export default CreateSubscription;
