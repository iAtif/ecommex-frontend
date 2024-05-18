import React, { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Table } from "antd";
import axios from "axios";

const columns = [
  {
    title: "SNo",
    render: (text, record, index) => index + 1,
  },
  {
    title: "Order Number",
    dataIndex: "orderNumber",
    sorter: (a, b) => a.orderNumber - b.orderNumber,
  },
  {
    title: "Customer",
    dataIndex: "customer",
    render: (customer) =>
      `${customer.customerId.firstName} ${customer.customerId.lastName}`,
  },
  {
    title: "Product",
    dataIndex: "products",
    render: (products) =>
      products.map((product) => product.productId.name).join(", "),
  },
  {
    title: "Quantity",
    dataIndex: "products",
    render: (products) =>
      products.map((product) => product.quantity).join(", "),
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

const SellerDashboard = () => {
  const [showDailySales, setShowDailySales] = useState(true);
  const [showWeeklySales, setShowWeeklySales] = useState(false);
  const [salesData, setSalesData] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [orders, setOrders] = useState([]);

  const fetchSalesData = async (dateFilter) => {
    try {
      const token = JSON.parse(localStorage.getItem("auth"))?.token;
      const response = await axios.get(
        `http://localhost:5000/whole-seller/orders?date_filter=${dateFilter}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        if (dateFilter === "today") {
          setSalesData([
            { Date: "Today", Sales: response.data.data.totalSale },
          ]);
          setTotalSales(response.data.data.totalSale);
        } else if (
          dateFilter === "weekly" &&
          response.data.data.total_by_date
        ) {
          setSalesData(
            response.data.data.total_by_date.map((item) => ({
              Date: new Date(item.date).toLocaleDateString(),
              Sales: item.total,
            }))
          );
          setTotalSales(response.data.data.totalSale);
        } else if (
          dateFilter === "monthly" &&
          response.data.data.total_by_date
        ) {
          setSalesData(
            response.data.data.total_by_date.map((item) => ({
              Date: new Date(item.date).toLocaleDateString(),
              Sales: item.total,
            }))
          );
          setTotalSales(response.data.data.totalSale);
        } else {
          setSalesData([]);
        }
        setOrders(response.data.data.orders);
      } else {
        throw new Error("Failed to fetch sales data");
      }
    } catch (error) {
      console.error("Error fetching sales data:", error);
    }
  };

  useEffect(() => {
    fetchSalesData("today");
  }, []);

  const handleDailySalesClick = () => {
    setShowDailySales(true);
    setShowWeeklySales(false);
    fetchSalesData("today");
  };

  const handleWeeklySalesClick = () => {
    setShowDailySales(false);
    setShowWeeklySales(true);
    fetchSalesData("weekly");
  };

  const handleMonthlySalesClick = () => {
    setShowDailySales(false);
    setShowWeeklySales(false);
    fetchSalesData("monthly");
  };

  return (
    <div>
      <Toaster />
      <h3 className="mb-4 title">WholeSeller Dashboard</h3>
      <div className="d-flex justify-content-center gap-5">
        <div
          className={`bg-white p-3 rounded-3 cursor ${
            showDailySales ? "active" : ""
          }`}
          onClick={handleDailySalesClick}
        >
          <div>
            <p className="desc title mb-0">Today's Sale</p>
          </div>
        </div>
        <div
          className={`bg-white p-3 rounded-3 cursor ${
            !showDailySales && showWeeklySales ? "active" : ""
          }`}
          onClick={handleWeeklySalesClick}
        >
          <div>
            <p className="desc title mb-0">Weekly Sale</p>
          </div>
        </div>
        <div
          className={`bg-white p-3 rounded-3 cursor ${
            !showDailySales && !showWeeklySales ? "active" : ""
          }`}
          onClick={handleMonthlySalesClick}
        >
          <div>
            <p className="desc title mb-0">Monthly Sale</p>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center mt-3">
        <div className="bg-white p-3 rounded-3" onClick={handleDailySalesClick}>
          <div className="text-center">
            <p className="total-sale title mb-0">Total Sales</p>
            <p className="mb-0">Rs. {totalSales}</p>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-3 title">Income Statics</h3>
        <div className="d-flex justify-content-center">
          <ResponsiveContainer width="80%" height={400}>
            <BarChart data={salesData}>
              <XAxis dataKey="Date" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="Sales"
                fill="#ffd333"
                label={{ position: "middle", fill: "#000000" }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <h6 className="text-center">
          {showDailySales
            ? "Today"
            : `${showWeeklySales ? "Weekly" : "Monthly"}`}{" "}
          Sales Data
        </h6>
      </div>
      <h3 className="mt-4 mb-4 title">Orders</h3>
      <div>
        <Table
          columns={columns}
          dataSource={orders}
          tableLayout="auto"
          rowKey="_id"
        />
      </div>
    </div>
  );
};

export default SellerDashboard;
