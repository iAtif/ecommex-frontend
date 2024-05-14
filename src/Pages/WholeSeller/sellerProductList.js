import React, { useEffect, useState } from "react";
import { Table, Modal, Form, Input, Select, Button } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import toast from "react-hot-toast";
import Spinner from "./../../Components/Spinner";
import axios from "axios";

const { Option } = Select;

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Image",
    dataIndex: "image",
    render: (image) => (
      <img src={image} alt="Product" style={{ width: 50, height: 50 }} />
    ),
  },
  {
    title: "Title",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Description",
    dataIndex: "description",
    sorter: (a, b) => a.description.length - b.description.length,
  },
  {
    title: "Actual Price",
    dataIndex: "price",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Discount",
    dataIndex: "discountInPercent",
    sorter: (a, b) => a.discountInPercent - b.discountInPercent,
  },
  {
    title: "Discounted Price",
    dataIndex: "payableAmount",
    sorter: (a, b) => a.payableAmount - b.payableAmount,
  },
  {
    title: "Status",
    dataIndex: "status",
    sorter: (a, b) => a.status.length - b.status.length,
  },
  {
    title: "Category",
    dataIndex: "category",
    sorter: (a, b) => a.category.length - b.category.length,
  },
  {
    title: "Min. Order",
    dataIndex: "minimumOrder",
    sorter: (a, b) => a.minimumOrder - b.minimumOrder,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Productlist = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);

  const fetchProductList = async () => {
    try {
      setLoading(true);
      const auth = JSON.parse(localStorage.getItem("auth"));
      const token = auth?.token;
      const sellerId = auth?.seller?.id;
      if (!token || !sellerId) {
        throw new Error("Token or Seller ID not found");
      }

      const response = await axios.get(
        `http://localhost:5000/products?createdBy=${sellerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setProducts(response.data.products);
      } else {
        throw new Error("Failed to fetch product list");
      }
    } catch (error) {
      toast.error("Error Fetching Product");
      console.error("Error fetching product list:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async (productId) => {
    setSelectedProduct(productId);
    setConfirmDeleteVisible(true);
  };

  const confirmDelete = async () => {
    try {
      setLoading(true);
      const token = JSON.parse(localStorage.getItem("auth"))?.token;
      if (!token) {
        throw new Error("Token not found");
      }

      await axios.delete(`http://localhost:5000/products/${selectedProduct}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // After deletion, fetch products again to update the product list
      await fetchProductList();
      toast.success("Product Deleted Successfully");
      setConfirmDeleteVisible(false); // Close the confirmation modal
    } catch (error) {
      toast.error("Error Deleting Product");
      console.error("Error deleting product:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setVisible(true);
  };

  // Handle update product
  const handleUpdate = async (formData) => {
    try {
      setLoading(true);
      const token = JSON.parse(localStorage.getItem("auth"))?.token;
      if (!token) {
        throw new Error("Token not found");
      }

      await axios.put(
        `http://localhost:5000/products/${selectedProduct.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // After update, fetch products again to update the product list
      await fetchProductList();
      toast.success("Product Updated Successfully");
      setVisible(false);
    } catch (error) {
      toast.error("Error Updating Product");
      console.error("Error updating product:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductList();
  }, []);

  const data = Array.isArray(products)
    ? products.map((product, index) => ({
        key: index + 1,
        image: product.images.length > 0 ? product.images[0] : "",
        name: product.name,
        description: product.description,
        price: `${product.price.currency + " " + product.price.amount}`,
        discountInPercent: `${product.discountInPercent + "%"}`,
        status: product.status,
        category: product.categoryId.name,
        minimumOrder: product.minimumOrder,
        payableAmount: `${
          product.price.currency + " " + product.payableAmount
        }`,
        action: (
          <>
            <button
              className="btn btn-outline-primary btn-sm m-1"
              onClick={() => handleEdit(product)}
            >
              <BiEdit style={{ fontSize: "24px" }} />
            </button>
            <button
              className="btn btn-outline-danger btn-sm m-1"
              onClick={() => handleDelete(product.id)}
            >
              <AiFillDelete style={{ fontSize: "24px" }} />
            </button>
          </>
        ),
      }))
    : [];

  if (loading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <h3 className="mb-4 title">Products</h3>
      <div>
        <Table columns={columns} dataSource={data} tableLayout="auto" />
      </div>

      {/* Modal for updating product details */}
      <Modal
        title="Edit Product"
        open={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <ProductForm
          initialValues={selectedProduct}
          onSubmit={handleUpdate}
          onCancel={() => setVisible(false)}
        />
      </Modal>

      {/* Confirmation Modal for Deleting Product */}
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
        <p>Are you sure you want to delete this product?</p>
      </Modal>
    </div>
  );
};

// Form component for updating product details
const ProductForm = ({ initialValues, onSubmit }) => {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Pre-populate form fields including images
    form.setFieldsValue(initialValues);
    // Fetch categories from the database
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/categories");
        if (response.status === 200) {
          setCategories(response.data.categories);
        } else {
          throw new Error("Failed to fetch categories");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [form, initialValues]);

  const handleUpdate = async (formData) => {
    try {
      formData.price.currency = "Rs.";
      await onSubmit(formData);
      form.resetFields();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleUpdate}>
      <Form.Item
        name="name"
        label="Title"
        rules={[{ required: true, message: "Title is required" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
        rules={[{ required: true, message: "Description is required" }]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item
        name={["price", "amount"]}
        label="Price"
        rules={[{ required: true, message: "Amount is required" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="discountInPercent"
        label="Discount (%)"
        rules={[{ required: true, message: "Discount is required" }]}
      >
        <Input type="number" min={0} max={99} placeholder="Enter Discount" />
      </Form.Item>
      <Form.Item
        name="status"
        label="Status"
        rules={[{ required: true, message: "Status is required" }]}
      >
        <Select>
          <Option value="Active">Active</Option>
          <Option value="Inactive">Inactive</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="categoryId"
        label="Category"
        rules={[{ required: true, message: "Category is required" }]}
      >
        <Select>
          {categories.map((category) => (
            <Option key={category._id} value={category._id}>
              {category.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="minimumOrder"
        label="Minimum Order"
        rules={[{ required: true, message: "Minimum Order is required" }]}
      >
        <Select>
          <Option value="5">5</Option>
          <Option value="10">10</Option>
        </Select>
      </Form.Item>
      <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
        <button className="btn btn btn-danger btn-sm" type="submit">
          Update
        </button>
      </div>
    </Form>
  );
};

export default Productlist;
