import React, { useState, useEffect } from "react";

const Spinner = () => {
  const [count, setCount] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);

    // Cleanup function to clear interval when count reaches 0
    return () => {
      if (count === 0) {
        clearInterval(interval);
      }
    };
  }, [count]);

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
