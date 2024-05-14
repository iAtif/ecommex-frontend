import React, { useEffect, useState } from "react";
import { Table, Button, Modal } from "antd";
import { AiFillDelete } from "react-icons/ai";
import toast from "react-hot-toast";
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
    title: "Products",
    dataIndex: "productName",
    sorter: (a, b) => a.productName.length - b.productName.length,
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
  {
    title: "Action",
    dataIndex: "action",
  },
];

const DeliveredOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);

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
        setOrders(response.data.Orders);
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

  const handleDeleteOrder = async () => {
    try {
      setLoading(true);
      const token = JSON.parse(localStorage.getItem("auth"))?.token;
      if (!token) {
        throw new Error("Token not found");
      }

      await axios.delete(`http://localhost:5000/orders/${selectedOrderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // After deletion, fetch orders again to update the order list
      await fetchOrders();
      toast.success("Order Deleted Successfully");
      setConfirmDeleteVisible(false);
    } catch (error) {
      toast.error("Error Deleting Order");
      console.error("Error deleting order:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteOrderCancel = () => {
    setConfirmDeleteVisible(false);
  };

  const handleDelete = (orderId) => {
    setSelectedOrderId(orderId);
    setConfirmDeleteVisible(true);
  };

  const all_orders = Array.isArray(orders)
    ? orders
        .filter((order) => order.status === "Delivered")
        .map((order, index) => ({
          key: index + 1,
          orderNumber: order.orderNumber,
          customerName:
            order.customer?.customerId?.firstName +
            " " +
            order.customer?.customerId?.lastName,
          productName: order.products
            ? order.products.map((product) => product.productId.name).join(", ")
            : "No Products",
          totalAmount: `Rs. ${order.totalAmount}`,
          status: order.status,
          action: (
            <>
              <Button type="link" onClick={() => handleDelete(order._id)}>
                <AiFillDelete style={{ fontSize: "24px", color: "red" }} />
              </Button>
            </>
          ),
        }))
    : [];

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <h3 className="mb-4 title">Change Order Status</h3>
      <div>
        <Table columns={columns} dataSource={all_orders} tableLayout="auto" />
      </div>
      {/* Confirmation Modal for Deleting Order */}
      <Modal
        title="Confirm Delete"
        open={confirmDeleteVisible}
        onOk={handleDeleteOrder}
        onCancel={handleDeleteOrderCancel}
        okText="Yes"
        cancelText="No"
      >
        <p>Are you sure you want to delete this order?</p>
      </Modal>
    </div>
  );
};

export default DeliveredOrders;
