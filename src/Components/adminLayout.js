import React, { useState } from "react";
import { AiOutlineDashboard } from "react-icons/ai";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { FaRegUser, FaProductHunt } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { BsDatabase } from "react-icons/bs";
import { TbClipboardList } from "react-icons/tb";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import { useAuth } from "../Context/auth";
const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleLogout = () => {
    setAuth({
      ...auth,
      admin: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
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
          theme="light"
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
              key: "users",
              icon: <FaRegUser />,
              label: "Users",
              children: [
                {
                  key: "all-sellers",
                  icon: <HiOutlineUserGroup />,
                  label: "ReSellers",
                },
                {
                  key: "wholeSeller",
                  icon: <HiOutlineUserGroup />,
                  label: "WholeSellers",
                },
              ],
            },
            {
              key: "Catalog",
              icon: <BsDatabase />,
              label: "Catalog",
              children: [
                {
                  key: "add-category",
                  icon: <BiCategory />,
                  label: "Add Category",
                },
                {
                  key: "category-list",
                  icon: <BiCategory />,
                  label: "Category List",
                },
                {
                  key: "product-List",
                  icon: <FaProductHunt />,
                  label: "Products List",
                },
              ],
            },
            {
              key: "order",
              icon: <TbClipboardList />,
              label: "Orders",
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
            {/* <div className="position-relative">
              <IoIosNotifications className="fs-4" />
              <span className="badge bg-warning rounded-circle p-1 position-absolute">
                3
              </span>
            </div> */}

            <div className="d-flex gap-3 align-items-center dropdown">
              {/* <div>
                <img
                  width={32}
                  height={32}
                  src="https://stroyka-admin.html.themeforest.scompiler.ru/variants/ltr/images/customers/customer-4-64x64.jpg"
                  alt=""
                />
              </div> */}
              <div
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <h5 className="mb-0">ADMIN</h5>
                <p className="mb-0">{auth.admin?.email}</p>
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
                    to="/admin"
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
export default AdminLayout;
