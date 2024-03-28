import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Spinner = () => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((preValue) => --preValue);
    }, 1000);
    if (count === 0) {
      clearInterval(interval);
      navigate("/login");
      toast.error("Please Authenticate");
    }
    return () => clearInterval(interval);
  }, [count, navigate]);
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ padding: "180px" }}
    >
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
