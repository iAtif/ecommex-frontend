import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
/* LAYOUT */
import AdminLayout from "./Components/adminLayout";
import Layout from "./Components/Layout";
import SellerLayout from "./Components/sellerLayout";
/* PAGES ROUTES */
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
import AdminForgotPassword from "./Pages/Admin/adminForgotPassword";
import AdminResetPassword from "./Pages/Admin/adminResetPassword";
import AdminDashboard from "./Pages/Admin/adminDashboard";
/* USER ROUTES */
import Login from "./Pages/User/userLogin";
import SignUp from "./Pages/User/userSignUp";
import ForgotPassword from "./Pages/User/userForgotPassword";
import ResetPassword from "./Pages/User/userResetPassword";
import Dashboard from "./Pages/User/userDashboard";
/* SELLER ROUTES */
import SellerLogin from "./Pages/WholeSeller/sellerLogin";
import SellerSignUp from "./Pages/WholeSeller/sellerSignUp";
import SellerForgotPassword from "./Pages/WholeSeller/sellerForgotPassword";
import SellerResetPassword from "./Pages/WholeSeller/sellerResetPassword";
import SellerDashboard from "./Pages/WholeSeller/sellerDashboard";
import SellerAddProduct from "./Pages/WholeSeller/sellerAddProduct";
import SellerProductList from "./Pages/WholeSeller/sellerProductList";
import PrivateRoute from "./Components/Routes/userPrivate";
import GetSellers from "./Pages/Admin/getSellers";

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
            <Route path="trending" element={<TrendingProducts />} />
            <Route path="blogs" element={<Blog />} />
            {/* User Auth */}
            <Route path="login" element={<Login />} />
            <Route path="register" element={<SignUp />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password" element={<ResetPassword />} />
            <Route element={<PrivateRoute />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="compare" element={<CompareProduct />} />
              <Route path="wishlist" element={<Wishlist />} />
              <Route path="cart" element={<Cart />} />
            </Route>
          </Route>
          {/* Admin Auth */}
          <Route path="admin" element={<AdminLogin />} />
          <Route
            path="admin-forgot-password"
            element={<AdminForgotPassword />}
          />
          <Route path="admin-reset-password" element={<AdminResetPassword />} />
          <Route path="/admin-dashboard" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="all-sellers" element={<GetSellers />} />
          </Route>
          <Route path="admin-dashboard" element={<AdminDashboard />} />
          {/* WholeSaler Auth */}
          <Route path="seller-login" element={<SellerLogin />} />
          <Route path="seller-register" element={<SellerSignUp />} />
          <Route
            path="seller-forgot-password"
            element={<SellerForgotPassword />}
          />
          <Route
            path="seller-reset-password"
            element={<SellerResetPassword />}
          />
          <Route path="/seller-dashboard" element={<SellerLayout />}>
            <Route index element={<SellerDashboard />} />
            <Route path="add-product" element={<SellerAddProduct />} />
            <Route path="products-list" element={<SellerProductList />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
