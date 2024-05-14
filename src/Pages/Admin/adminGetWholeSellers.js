import React, { useState, useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import { Table, Button } from "antd";
import Spinner from "../../Components/Spinner";
import axios from "axios";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "First Name",
    dataIndex: "firstName",
    sorter: (a, b) => a.firstName.length - b.firstName.length,
  },
  {
    title: "Last Name",
    dataIndex: "lastName",
    sorter: (a, b) => a.lastName.length - b.lastName.length,
  },
  {
    title: "Email",
    dataIndex: "email",
    sorter: (a, b) => a.email.length - b.email.length,
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
  },
  {
    title: "Business Name",
    dataIndex: "businessName",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const AdminGetWholesellers = () => {
  const [wholeSellers, setWholeSellers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchWholeSellers = async () => {
      try {
        setLoading(true);
        const token = JSON.parse(localStorage.getItem("auth"))?.token;
        if (!token) {
          throw new Error("Token not found");
        }

        const response = await axios.get(
          "http://localhost:5000/admin/all-whole-sellers",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setWholeSellers(response.data.wholeSellers);
        } else {
          throw new Error("Failed to fetch sellers");
        }
      } catch (error) {
        console.error("Error fetching sellers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWholeSellers();
  }, []);

  const wholeseller = wholeSellers.map((wholeSeller, index) => ({
    key: index + 1,
    firstName: wholeSeller.firstName,
    lastName: wholeSeller.lastName,
    email: wholeSeller.email,
    mobile: "+92-" + wholeSeller.mobile,
    businessName: wholeSeller.businessName,
    action: (
      <>
        <Button type="link">
          <AiFillDelete style={{ fontSize: "24px", color: "red" }} />
        </Button>
      </>
    ),
  }));

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <h3 className="mb-4 title">Sellers</h3>
      <div>
        <Table columns={columns} dataSource={wholeseller} tableLayout="auto" />
      </div>
    </div>
  );
};

export default AdminGetWholesellers;
