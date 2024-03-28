import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { AiOutlineDashboard } from "react-icons/ai";
import { BsChat, BsDatabase } from "react-icons/bs";
import { TbClipboardList } from "react-icons/tb";
import { IoIosNotifications } from "react-icons/io";
import { Layout, Menu, theme } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../Context/auth";
const { Header, Sider, Content } = Layout;

const SellerLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleLogout = async () => {
    try {
      setAuth({
        ...auth,
        seller: null,
        token: "",
      });
      localStorage.removeItem("auth");
      toast.success("Logout Successfully");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout");
    }
  };

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h2 className="text-white fs-5 text-center pt-3 mb-0">
            <span className="sm-logo">Ecom</span>
            <span className="lg-logo">Ecommex</span>
          </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[""]}
          onClick={({ key }) => {
            if (key === "signout") {
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: "",
              icon: <AiOutlineDashboard />,
              label: "Dashboard",
            },
            {
              key: "Catalog",
              icon: <BsDatabase />,
              label: "Catalog",
              children: [
                {
                  key: "add-product",
                  label: "Products",
                },
                {
                  key: "products-list",
                  label: "Products List",
                },
              ],
            },
            {
              key: "orders",
              icon: <TbClipboardList />,
              label: "Orders",
            },
            {
              key: "Chat",
              icon: <BsChat />,
              label: "Chat",
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="d-flex justify-content-between ps-1 pe-5"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <Content
            style={{
              padding: "10px",
              minHeight: 150,
              background: colorBgContainer,
            }}
          >
            {/* Outlet for nested routes */}
          </Content>
          <div className="d-flex gap-4 align-items-center">
            <div className="position-relative">
              <IoIosNotifications className="fs-4" />
              <span className="badge bg-warning rounded-circle p-1 position-absolute">
                3
              </span>
            </div>

            <div className="d-flex gap-3 align-items-center dropdown">
              {/* <div>
                <img width={32} height={32} src="" alt="user" />
              </div> */}
              <div
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <h5 className="mb-0">
                  {auth.seller?.firstName} {auth.seller?.lastName}
                </h5>
                <p className="mb-0">{auth.seller?.email}</p>
              </div>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li>
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    to="/"
                  >
                    View Profile
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={handleLogout}
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    to="/seller-login"
                  >
                    Signout
                  </Link>
                </li>
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
          <Toaster />
        </Content>
      </Layout>
    </Layout>
  );
};
export default SellerLayout;
