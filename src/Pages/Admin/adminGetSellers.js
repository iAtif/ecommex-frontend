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
    title: "Action",
    dataIndex: "action",
  },
];

const AdminGetSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        setLoading(true);
        const token = JSON.parse(localStorage.getItem("auth"))?.token;
        if (!token) {
          throw new Error("Token not found");
        }

        const response = await axios.get(
          "http://localhost:5000/admin/all-sellers",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setSellers(response.data.sellers);
        } else {
          throw new Error("Failed to fetch sellers");
        }
      } catch (error) {
        console.error("Error fetching sellers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSellers();
  }, []);

  const user = sellers.map((seller, index) => ({
    key: index + 1,
    firstName: seller.firstName,
    lastName: seller.lastName,
    email: seller.email,
    mobile: "+92-" + seller.mobile,
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
      <h3 className="mb-4 title">Users</h3>
      <div>
        <Table columns={columns} dataSource={user} tableLayout="auto" />
      </div>
    </div>
  );
};

export default AdminGetSellers;
