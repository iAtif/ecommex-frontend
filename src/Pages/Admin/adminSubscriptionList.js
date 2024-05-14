import React, { useState, useEffect } from "react";
import { Table, Modal, Button, Form, Input, Select } from "antd";
import { AiFillDelete, AiOutlineEdit } from "react-icons/ai";
import toast from "react-hot-toast";
import axios from "axios";

const { Option } = Select;

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Description",
    dataIndex: "description",
    sorter: (a, b) => a.description.length - b.description.length,
  },
  {
    title: "Duration",
    dataIndex: "duration",
    sorter: (a, b) => a.duration.length - b.duration.length,
  },
  {
    title: "Price",
    dataIndex: "price",
    sorter: (a, b) => a.price.length - b.price.length,
  },
  {
    title: "Features",
    dataIndex: "features",
    render: (features) => (
      <ol>
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ol>
    ),
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const SubscriptionList = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState(null);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [updatedSubscription, setUpdatedSubscription] = useState(null);

  // Fetch Subscriptions from Backend
  useEffect(() => {
    fetchSubscriptions();
  }, []);
  const fetchSubscriptions = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("auth"))?.token;
      const response = await axios.get(
        "http://localhost:5000/subscription-plan",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSubscriptions(response.data.subscriptions);
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
      toast.error("Error fetching subscriptions");
    }
  };

  const handleUpdate = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("auth"))?.token;
      await axios.put(
        `http://localhost:5000/subscription-plan/${selectedSubscription._id}`,
        updatedSubscription,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await fetchSubscriptions();
      toast.success("Subscription Plan Updated Successfully");
      setUpdateModalVisible(false);
    } catch (error) {
      toast.error("Error Updating Subscription Plan");
      console.error("Error updating subscription:", error);
    }
  };

  const confirmDelete = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("auth"))?.token;
      console.log(token);
      await axios.delete(
        `http://localhost:5000/subscription-plan/${selectedSubscription._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await fetchSubscriptions();
      toast.success("Subscription Plan Deleted Successfully");
      setConfirmDeleteVisible(false);
    } catch (error) {
      toast.error("Error Deleting Subscription");
      console.error("Error deleting subscription:", error);
    }
  };

  const openUpdateModal = (subscription) => {
    setSelectedSubscription(subscription);
    setUpdatedSubscription({ ...subscription });
    setUpdateModalVisible(true);
  };

  const openDeleteConfirmation = (subscription) => {
    setSelectedSubscription(subscription);
    setConfirmDeleteVisible(true);
  };
  const data = Array.isArray(subscriptions)
    ? subscriptions.map((subscription, index) => ({
        key: index + 1,
        name: subscription.name,
        description: subscription.description,
        duration: `${subscription.durationInMonths + " Months"}`,
        price: `${
          subscription.price.currency + " " + subscription.price.amount
        }`,
        features: subscription.features,
        action: (
          <>
            <Button
              type="link"
              onClick={() => openUpdateModal(subscription)}
              style={{ marginRight: 8 }}
            >
              <AiOutlineEdit style={{ fontSize: 18, color: "#1890ff" }} />
            </Button>
            <Button
              type="link"
              onClick={() => openDeleteConfirmation(subscription)}
            >
              <AiFillDelete style={{ fontSize: "24px", color: "red" }} />
            </Button>
          </>
        ),
      }))
    : [];

  return (
    <div>
      <h3 className="mb-4 title">Subscription Plans</h3>
      <div>
        <Table columns={columns} dataSource={data} tableLayout="auto" />
      </div>
      {/* Update Subscription Modal */}
      <Modal
        title="Update Subscription Plan"
        open={updateModalVisible}
        onCancel={() => setUpdateModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setUpdateModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="update" type="primary" onClick={handleUpdate}>
            Update
          </Button>,
        ]}
      >
        <Form>
          <Form.Item label="Name">
            <Input
              value={updatedSubscription?.name}
              onChange={(e) =>
                setUpdatedSubscription({
                  ...updatedSubscription,
                  name: e.target.value,
                })
              }
            />
          </Form.Item>
          <Form.Item label="Description">
            <Input.TextArea
              value={updatedSubscription?.description}
              onChange={(e) =>
                setUpdatedSubscription({
                  ...updatedSubscription,
                  description: e.target.value,
                })
              }
            />
          </Form.Item>
          <Form.Item label="Duration">
            <Select
              value={updatedSubscription?.durationInMonths}
              onChange={(value) =>
                setUpdatedSubscription({
                  ...updatedSubscription,
                  durationInMonths: value,
                })
              }
            >
              <Option value={1}>1 Month</Option>
              <Option value={3}>3 Months</Option>
              <Option value={6}>6 Months</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Features">
            <Input.TextArea
              value={updatedSubscription?.features.join("\n")}
              onChange={(e) =>
                setUpdatedSubscription({
                  ...updatedSubscription,
                  features: e.target.value.split("\n"),
                })
              }
              rows={4}
            />
          </Form.Item>
          <Form.Item label="Price">
            <Input
              value={updatedSubscription?.price.amount}
              onChange={(e) =>
                setUpdatedSubscription({
                  ...updatedSubscription,
                  price: {
                    ...updatedSubscription.price,
                    amount: e.target.value,
                  },
                })
              }
            />
          </Form.Item>
        </Form>
      </Modal>
      {/* Confirmation Modal for Deleting Subscription */}
      <Modal
        title="Confirm Delete"
        open={confirmDeleteVisible}
        onCancel={() => setConfirmDeleteVisible(false)}
        footer={[
          <Button key="yes" type="primary" onClick={confirmDelete}>
            Yes
          </Button>,
          <Button key="no" onClick={() => setConfirmDeleteVisible(false)}>
            No
          </Button>,
        ]}
      >
        <p>Are you sure you want to delete this subscription-plan?</p>
      </Modal>
    </div>
  );
};
export default SubscriptionList;
