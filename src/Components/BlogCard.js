import React from "react";
import { Link } from "react-router-dom";

const BlogCard = () => {
  return (
    <div className="col-3">
      <div className="blog-card">
        <div className="card-image">
          <img src="images/blog-1.jpg" className="img-fluid" alt="blog" />
        </div>
        <div className="blog-content">
          <p className="date">10 Dec, 2023</p>
          <h5 className="title">How to Start Ecommerce?</h5>
          <p className="desc">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s
          </p>
          <Link className="button" to="/">
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
