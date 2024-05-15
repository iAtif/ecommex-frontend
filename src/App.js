import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
/* LAYOUT */
import AdminLayout from "./Components/AdminLayout";
import Layout from "./Components/Layout";
import SellerLayout from "./Components/SellerLayout";
/* PAGES ROUTES */
import Home from "./Pages/Home";
import Contact from "./Pages/Contact";
import OurStore from "./Pages/OurStore";
import SingleProduct from "./Pages/SingleProduct";
import CompareProduct from "./Pages/CompareProduct";
import Wishlist from "./Pages/Wishlist";
import TrendingProducts from "./Pages/TrendingProducts";
import Cart from "./Pages/Cart";
import Chat from "./Pages/Chat";
/* ADMIN ROUTES */
import AdminLogin from "./Pages/Admin/adminLogin";
import AdminForgotPassword from "./Pages/Admin/adminForgotPassword";
import AdminResetPassword from "./Pages/Admin/adminResetPassword";
import AdminDashboard from "./Pages/Admin/adminDashboard";
import AdminGetSellers from "./Pages/Admin/adminGetSellers";
import AdminProductList from "./Pages/Admin/adminProductList";
import AdminGetWholesellers from "./Pages/Admin/adminGetWholeSellers";
import AdminCategoryList from "./Pages/Admin/adminCategoryList";
import CreateSubscription from "./Pages/Admin/adminCreateSubscription";
import SubscriptionList from "./Pages/Admin/adminSubscriptionList";
import AdminOrderStatus from "./Pages/Admin/adminOrderStatus";
import DeliveredOrders from "./Pages/Admin/adminDeliveredOrders";
/* USER ROUTES */
import Login from "./Pages/User/userLogin";
import SignUp from "./Pages/User/userSignUp";
import ForgotPassword from "./Pages/User/userForgotPassword";
import ResetPassword from "./Pages/User/userResetPassword";
import Dashboard from "./Pages/User/userDashboard";
import Notifications from "./Pages/Notification";
import Checkout from "./Pages/Checkout";
import Payment from "./Pages/Payment";
/* SELLER ROUTES */
import SellerLogin from "./Pages/WholeSeller/sellerLogin";
import SellerSignUp from "./Pages/WholeSeller/sellerSignUp";
import SellerForgotPassword from "./Pages/WholeSeller/sellerForgotPassword";
import SellerResetPassword from "./Pages/WholeSeller/sellerResetPassword";
import SellerDashboard from "./Pages/WholeSeller/sellerDashboard";
import SellerAddProduct from "./Pages/WholeSeller/sellerAddProduct";
import SellerProductList from "./Pages/WholeSeller/sellerProductList";
import PrivateRoute from "./Components/Routes/userPrivate";
import SellerOrder from "./Pages/WholeSeller/sellerOrder";
import SubscriptionPayment from "./Pages/subscriptionPayment";
import SellerChat from "./Pages/WholeSeller/sellerChat";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="contact" element={<Contact />} />
            <Route path="store" element={<OurStore />} />
            <Route path="store/:id" element={<SingleProduct />} />
            {/* User Routes */}
            <Route path="login" element={<Login />} />
            <Route path="register" element={<SignUp />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password" element={<ResetPassword />} />
            <Route element={<PrivateRoute />}>
              <Route path="compare" element={<CompareProduct />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="wishlist" element={<Wishlist />} />
              <Route path="cart" element={<Cart />} />
              <Route path="trending" element={<TrendingProducts />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="checkout-information" element={<Checkout />} />
              <Route path="checkout-payment" element={<Payment />} />
              <Route
                path="subscription-payment"
                element={<SubscriptionPayment />}
              />
            </Route>
          </Route>
          <Route path="/chat/:chatId" element={<Chat />} />
          {/* Admin Routes */}
          <Route path="admin" element={<AdminLogin />} />
          <Route
            path="admin-forgot-password"
            element={<AdminForgotPassword />}
          />
          <Route path="admin-reset-password" element={<AdminResetPassword />} />
          <Route element={<AdminLayout />}>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="sellers" element={<AdminGetSellers />} />
            <Route path="wholesellers" element={<AdminGetWholesellers />} />
            <Route path="products" element={<AdminProductList />} />
            <Route path="categories" element={<AdminCategoryList />} />
            <Route path="add-subscription" element={<CreateSubscription />} />
            <Route path="subscription" element={<SubscriptionList />} />
            <Route path="order-status" element={<AdminOrderStatus />} />
            <Route path="delivered-orders" element={<DeliveredOrders />} />
          </Route>
          {/* WholeSeller Routes */}
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
          <Route element={<SellerLayout />}>
            <Route path="/seller-dashboard" element={<SellerDashboard />} />
            <Route path="add-product" element={<SellerAddProduct />} />
            <Route path="products-list" element={<SellerProductList />} />
            <Route path="seller-orders" element={<SellerOrder />} />
            <Route path="seller-chat" element={<SellerChat />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
