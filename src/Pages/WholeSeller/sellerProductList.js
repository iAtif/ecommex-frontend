import React, { useEffect, useState } from "react";
import { Table, Modal, Form, Input, Select } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";

const { Option } = Select;

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
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
    title: "Price",
    dataIndex: "price",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Discount",
    dataIndex: "discountInPercent",
    sorter: (a, b) => a.discountInPercent - b.discountInPercent,
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
    title: "Minimum Order",
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
  const [error, setError] = useState(null);
  const [visible, setVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProductList = async () => {
    try {
      setLoading(true);
      const token = JSON.parse(localStorage.getItem("auth"))?.token;
      if (!token) {
        throw new Error("Token not found");
      }

      const response = await axios.get("http://localhost:5000/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setProducts(response.data.products);
      } else {
        throw new Error("Failed to fetch product list");
      }
    } catch (error) {
      console.error("Error fetching product list:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    try {
      setLoading(true);
      const token = JSON.parse(localStorage.getItem("auth"))?.token;
      if (!token) {
        throw new Error("Token not found");
      }

      await axios.delete(`http://localhost:5000/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // After deletion, fetch products again to update the product list
      await fetchProductList();
    } catch (error) {
      console.error("Error deleting product:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setVisible(true);
  };

  const handleUpdate = async (values) => {
    try {
      setLoading(true);
      const token = JSON.parse(localStorage.getItem("auth"))?.token;
      if (!token) {
        throw new Error("Token not found");
      }

      await axios.put(
        `http://localhost:5000/products/${selectedProduct.id}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // After update, fetch products again to update the product list
      await fetchProductList();
      setVisible(false);
    } catch (error) {
      console.error("Error updating product:", error);
      setError(error.message);
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
        name: product.name,
        description: product.description,
        price: `${product.price.amount + " " + product.price.currency}`,
        discountInPercent: `${product.discountInPercent + "%"}`,
        status: product.status,
        category: product.category.name,
        minimumOrder: product.minimumOrder,
        action: (
          <>
            <button
              className="btn btn-outline-primary btn-sm m-1"
              onClick={() => handleEdit(product)}
            >
              <BiEdit style={{ fontSize: "24px" }} />
            </button>
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={() => handleDelete(product.id)}
            >
              <AiFillDelete style={{ fontSize: "24px" }} />
            </button>
          </>
        ),
      }))
    : [];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
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
    </div>
  );
};

// Form component for updating product details
const ProductForm = ({ initialValues, onSubmit, onCancel }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [form, initialValues]); // Include form in the dependency array

  return (
    <Form form={form} onFinish={onSubmit} layout="vertical">
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
        name="price"
        label="Price"
        rules={[{ required: true, message: "Price is required" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="discountInPercent"
        label="Discount"
        rules={[{ required: true, message: "Discount is required" }]}
      >
        <Select>
          <Option value={0}>0%</Option>
          <Option value={25}>25%</Option>
          <Option value={50}>50%</Option>
        </Select>
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
        name="category"
        label="Category"
        rules={[{ required: true, message: "Category is required" }]}
      >
        <Select>
          <Option value="Category 1">Category 1</Option>
          <Option value="Category 2">Category 2</Option>
          {/* Add more options as needed */}
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
          {/* Add more options as needed */}
        </Select>
      </Form.Item>
      <Form.Item>
        <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
          <button className="btn btn btn-danger btn-sm">Update</button>
          <button className="btn btn-primary btn-sm" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default Productlist;
