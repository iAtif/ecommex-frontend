import React, { useState, useEffect } from "react";
import { Table, Modal, Form, Input, Button } from "antd";
import { AiFillDelete } from "react-icons/ai";
import toast from "react-hot-toast";
import axios from "axios";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Category Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const AdminCategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [visible, setVisible] = useState(false);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [form] = Form.useForm();

  // Fetch Categories from Backend
  useEffect(() => {
    fetchCategories();
  }, []);
  const fetchCategories = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("auth"))?.token;
      const response = await axios.get("http://localhost:5000/categories", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories(response.data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Error fetching categories");
    }
  };
  const handleAddCategory = async (values) => {
    try {
      const token = JSON.parse(localStorage.getItem("auth"))?.token;
      await axios.post("http://localhost:5000/categories", values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await fetchCategories();
      toast.success("Category Added Successfully");
      setVisible(false);
      form.resetFields();
    } catch (error) {
      toast.error("Error Adding Category");
      console.error("Error adding category:", error);
    }
  };
  const confirmDelete = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("auth"))?.token;
      console.log(token);
      await axios.delete(
        `http://localhost:5000/categories/${selectedCategory._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await fetchCategories();
      toast.success("Category Deleted Successfully");
      setConfirmDeleteVisible(false);
    } catch (error) {
      toast.error("Error Deleting Category");
      console.error("Error deleting category:", error);
    }
  };
  const openDeleteConfirmation = (category) => {
    setSelectedCategory(category);
    setConfirmDeleteVisible(true);
  };
  const openModal = () => {
    setVisible(true);
  };
  const closeModal = () => {
    setVisible(false);
  };
  const data = Array.isArray(categories)
    ? categories.map((category, index) => ({
        key: index + 1,
        name: category.name,
        action: (
          <>
            <Button
              type="link"
              onClick={() => openDeleteConfirmation(category)}
            >
              <AiFillDelete style={{ fontSize: "24px", color: "red" }} />
            </Button>
          </>
        ),
      }))
    : [];

  return (
    <div>
      <h3 className="mb-4 title">Categories</h3>
      <div>
        <div className="d-flex justify-content-end mb-3">
          <Button type="primary" onClick={openModal}>
            Add Category
          </Button>
        </div>
        <Table columns={columns} dataSource={data} tableLayout="auto" />
      </div>
      {/* Modal for adding category */}
      <Modal
        title="Add Category"
        open={visible}
        onCancel={closeModal}
        footer={null}
      >
        <Form form={form} onFinish={handleAddCategory}>
          <Form.Item
            label="Category Name"
            name="name"
            rules={[{ required: true, message: "Please input category name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
              <button className="btn btn-primary btn-sm">Add</button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
      {/* Confirmation Modal for Deleting Category */}
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
        <p>Are you sure you want to delete this category?</p>
      </Modal>
    </div>
  );
};
export default AdminCategoryList;
