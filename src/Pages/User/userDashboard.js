import React, { useState, useEffect } from "react";
import BreadCrumb from "../../Components/BreadCrumb";
import Meta from "../../Components/Meta";
import { Table } from "antd";
import { useAuth } from "../../Context/auth";
import axios from "axios";

const Dashboard = () => {
  const [auth] = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSellerOrders = async () => {
      setLoading(true);
      try {
        const token = auth.token;
        const response = await axios.get("http://localhost:5000/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          // Filter orders based on the user_id of the logged-in seller
          const filteredOrders = response.data.Orders.filter(
            (order) => order.customer?.customerId?._id === auth.user.userId
          );
          setOrders(filteredOrders);
        } else {
          throw new Error("Failed to fetch seller orders");
        }
      } catch (error) {
        console.error("Error fetching seller orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSellerOrders();
  }, [auth]);

  const columns = [
    {
      title: "Order Number",
      dataIndex: "orderNumber",
      key: "orderNumber",
    },
    {
      title: "Products",
      dataIndex: "productName",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];

  // Map over orders to calculate total amount for each order
  const all_orders = orders.map((order) => ({
    key: order._id,
    orderNumber: order.orderNumber,
    productName: order.products
      ? order.products.map((product) => product.productId.name).join(", ")
      : "No Products",
    status: order.status,
  }));

  return (
    <>
      <Meta title={"Dashboard"} />
      <BreadCrumb
        items={[{ title: "Home", url: "/" }, { title: "Dashboard" }]}
      />
      <div
        className="dashboard-wrapper home-wrapper-2 py-3"
        style={{ minHeight: "calc(100vh - 480px)" }}
      >
        <div className="container-fluid">
          <div className="row">
            {/* <div className="col-12">
              <div className="auth-card">
                <h3 className="text-center mb-3">My Profile</h3>
                <form className="d-flex flex-column gap-15">
                  <div>
                    <p>{auth?.user?.firstName}</p>
                  </div>
                  <div>
                    <p>{auth?.user?.lastName}</p>
                  </div>
                </form>
              </div>
            </div> */}
            <h3 className="text-center mb-3">Order Tracking</h3>
            <div className="table-wrapper">
              <Table
                columns={columns}
                dataSource={all_orders}
                loading={loading}
                pagination={false}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
