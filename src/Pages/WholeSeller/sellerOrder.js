import React, { useState, useEffect } from "react";
import { Table } from "antd";
import Spinner from "../../Components/Spinner";
import axios from "axios";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Order Number",
    dataIndex: "orderNumber",
    sorter: (a, b) => a.orderNumber - b.orderNumber,
  },
  {
    title: "Customer",
    dataIndex: "customerName",
    sorter: (a, b) => a.customerName.length - b.customerName.length,
  },
  {
    title: "Product",
    dataIndex: "productName",
    sorter: (a, b) => a.productName.length - b.productName.length,
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    sorter: (a, b) => a.quantity - b.quantity,
  },
  {
    title: "Total Amount",
    dataIndex: "totalAmount",
    sorter: (a, b) => a.totalAmount - b.totalAmount,
  },
  {
    title: "Status",
    dataIndex: "status",
    sorter: (a, b) => a.status.length - b.status.length,
  },
];

const SellerOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const token = JSON.parse(localStorage.getItem("auth"))?.token;
      if (!token) {
        throw new Error("Token not found");
      }
      const response = await axios.get(
        "http://localhost:5000/whole-seller/orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setOrders(response.data.data.orders);
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
        orderNumber: order.orderNumber,
        customerName:
          order.customer?.customerId?.firstName +
          " " +
          order.customer?.customerId?.lastName,
        productName: order.products
          ? order.products.map((product) => product.productId.name).join(", ")
          : "No Products",
        quantity: order.products
          ? order.products.map((product) => product.quantity).join(", ")
          : 0,
        totalAmount: `Rs. ${order.totalAmount}`,
        status: order.status,
      }))
    : [];

  return (
    <div>
      <h3 className="mb-4 title">Orders</h3>
      <div>
        <Table columns={columns} dataSource={all_orders} tableLayout="auto" />
      </div>
    </div>
  );
};

export default SellerOrder;
