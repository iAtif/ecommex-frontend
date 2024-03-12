import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
/* PAGES ROUTES */
import Layout from "./Components/Layout";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import OurStore from "./Pages/OurStore";
import SingleProduct from "./Pages/SingleProduct";
import CompareProduct from "./Pages/CompareProduct";
import Wishlist from "./Pages/Wishlist";
import Cart from "./Pages/Cart";
import Blog from "./Pages/Blog";
import TrendingProducts from "./Pages/TrendingProducts";
/* ADMIN ROUTES */
import AdminLogin from "./Pages/Admin/adminLogin";
import AdminDashboard from "./Pages/Admin/adminDashboard";
/* USER ROUTES */
import Login from "./Pages/User/userLogin";
import SignUp from "./Pages/User/userSignUp";
import ForgotPassword from "./Pages/User/userForgotPassword";
import ResetPassword from "./Pages/User/userResetPassword";
import Dashboard from "./Pages/User/userDashboard";
import PrivateRoute from "./Components/Routes/userPrivate";
/* SELLER ROUTES */
import SellerLogin from "./Pages/WholeSeller/sellerLogin";
import SellerSignUp from "./Pages/WholeSeller/sellerSignUp";
import SellerDashboard from "./Pages/WholeSeller/sellerDashboard";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="products" element={<OurStore />} />
            <Route path="products/:id" element={<SingleProduct />} />
            <Route path="compare" element={<CompareProduct />} />
            <Route path="trending" element={<TrendingProducts />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="cart" element={<Cart />} />
            <Route path="blogs" element={<Blog />} />
            {/* User Auth */}
            <Route path="login" element={<Login />} />
            <Route path="dashboard" element={<PrivateRoute />}>
              <Route path="" element={<Dashboard />} />
            </Route>
            <Route path="register" element={<SignUp />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password" element={<ResetPassword />} />
          </Route>
          {/* Admin Auth */}
          <Route path="admin" element={<AdminLogin />} />
          <Route path="admin-dashboard" element={<PrivateRoute />}>
            <Route path="" element={<AdminDashboard />} />
          </Route>
          {/* WholeSaler Auth */}
          <Route path="seller-login" element={<SellerLogin />} />
          <Route path="seller-signup" element={<SellerSignUp />} />
          <Route path="seller-dashboard" element={<SellerDashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
