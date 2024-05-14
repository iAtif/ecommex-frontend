import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import Spinner from "../../Components/Spinner";
import { Table } from "antd";
import axios from "axios";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Order Number",
    dataIndex: "orderNumber",
  },
  {
    title: "Customer Name",
    dataIndex: "customerName",
  },
  {
    title: "Product",
    dataIndex: "productName",
  },
  {
    title: "Total Amount",
    dataIndex: "totalAmount",
    sorter: (a, b) => a.totalAmount - b.totalAmount,
  },
  {
    title: "Status",
    dataIndex: "status",
  },
];

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const token = JSON.parse(localStorage.getItem("auth"))?.token;
      if (!token) {
        throw new Error("Token not found");
      }

      const response = await axios.get("http://localhost:5000/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        // Filter orders with Pending status
        const filteredOrders = response.data.Orders.filter(
          (order) => order.status === "Pending"
        );

        // Sort orders by createdAt date in descending order to show new orders first
        const sortedOrders = filteredOrders.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setOrders(sortedOrders);
      } else {
        throw new Error("Failed to fetch orders list");
      }
    } catch (error) {
      console.error("Error fetching orders list:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  const all_orders = Array.isArray(orders)
    ? orders.map((order, index) => ({
        key: index + 1,
        customerName:
          order.customer?.customerId?.firstName +
          " " +
          order.customer?.customerId?.lastName,
        productName: order.products
          ? order.products.map((product) => product.productId.name).join(", ")
          : "No Products",
        orderNumber: order.orderNumber,
        totalAmount: `Rs. ${order.totalAmount}`,
        status: order.status,
      }))
    : [];

  return (
    <div>
      <Toaster />
      <h3 className="mb-4 title">Admin Dashboard</h3>
      <div className="mt-5">
        <h3 className="mb-3 title">Recent Orders</h3>
        <div>
          <Table columns={columns} dataSource={all_orders} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
