import React, { useState, useEffect } from "react";
import { Table, Button } from "antd";
import Meta from "../Components/Meta";
import BreadCrumb from "../Components/BreadCrumb";
import Spinner from "../Components/Spinner";
import toast from "react-hot-toast";
import axios from "axios";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("auth"))?.token;
      if (!token) {
        console.error("Token not found. Please login first.");
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get("http://localhost:5000/notification", {
        headers,
      });

      setNotifications(response.data.notifications || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setLoading(false);
    }
  };

  const removeNotification = async (_id, productId) => {
    try {
      await axios.post(`http://localhost:5000/notification/${_id}/remove`, {
        productId,
      });
      toast.success("Notification removed successfully");
      fetchNotifications();
    } catch (error) {
      console.error("Error removing notification:", error);
      toast.error("Error removing notification");
    }
  };

  const markAsRead = async (_id, productId) => {
    try {
      await axios.post(
        `http://localhost:5000/notification/${_id}/mark-as-read`,
        { productId }
      );
      const updatedNotifications = notifications.map((notif) =>
        notif._id === _id ? { ...notif, read: true } : notif
      );
      setNotifications(updatedNotifications);
      toast.success("Notification marked as read");
    } catch (error) {
      console.error("Error marking notification as read:", error);
      toast.error("Error marking notification as read");
    }
  };

  const columns = [
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <span>
          {!record.read && (
            <Button
              type="primary"
              className="m-1"
              onClick={() => markAsRead(record._id, record.productId)}
            >
              Mark as Read
            </Button>
          )}
          <Button
            danger
            className="m-1"
            onClick={() => removeNotification(record._id, record.productId)}
          >
            Remove
          </Button>
        </span>
      ),
    },
  ];

  if (loading) {
    return <Spinner />;
  }

  const unreadNotifications = notifications.filter((notif) => !notif.read);
  const readNotifications = notifications.filter((notif) => notif.read);

  return (
    <>
      <Meta title={"Notifications"} />
      <BreadCrumb
        items={[{ title: "Home", url: "/" }, { title: "Notifications" }]}
      />
      <div
        className="notification-wrapper home-wrapper-2 py-3"
        style={{ minHeight: "calc(100vh - 480px)" }}
      >
        <div className="container-fluid">
          <div className="row">
            <div className="col-6">
              <h4>Unread Notifications</h4>
              <Table columns={columns} dataSource={unreadNotifications} />
            </div>
            <div className="col-6">
              <h4>Read Notifications</h4>
              <Table columns={columns} dataSource={readNotifications} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notifications;
