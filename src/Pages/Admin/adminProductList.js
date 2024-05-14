import React, { useEffect, useState } from "react";
import { Table, Modal, Button } from "antd";
import { AiFillDelete } from "react-icons/ai";
import toast from "react-hot-toast";
import axios from "axios";

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
    title: "Minimum Order",
    dataIndex: "minimumOrder",
    sorter: (a, b) => a.minimumOrder - b.minimumOrder,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const AdminProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);

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

  useEffect(() => {
    fetchProductList();
  }, []);

  const all_products = Array.isArray(products)
    ? products.map((product, index) => ({
        key: index + 1,
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
            <Button type="link" onClick={() => handleDelete(product.id)}>
              <AiFillDelete style={{ fontSize: "24px", color: "red" }} />
            </Button>
          </>
        ),
      }))
    : [];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3 className="mb-4 title">Products</h3>
      <div>
        <Table columns={columns} dataSource={all_products} tableLayout="auto" />
      </div>
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
export default AdminProductList;
