import React from "react";
import { useNavigate, Outlet, Navigate } from "react-router-dom";
import { Layout, Menu, Dropdown, message, Avatar, Space } from "antd";
import {
  LaptopOutlined,
  SnippetsOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { useStore } from "../../store";
import { withAuth } from "../../components/Authorize";
import Notification from "../Notification";

import styles from "./index.module.css";

const { Header, Sider } = Layout;

// the sider menu items
const siderItems = [
  {
    label: "Equipment",
    key: "manage",
    icon: <LaptopOutlined />,
    children: [
      {
        label: "Equipment list",
        key: "/equipment",
      },
      {
        roles: ["Manager"],
        label: "Add equipment",
        key: "/equipment/add",
      },
    ],
  },
  {
    label: "Borrow",
    key: "borrow",
    icon: <SnippetsOutlined />,
    children: [
      {
        label: "Borrow record",
        key: "/borrow",
      },
      {
        roles: ["Manager"],
        label: "Add borrow",
        key: "/borrow/add",
      },
    ],
  },
  {
    key: "/about",
    icon: <NotificationOutlined />,
    label: "About",
  },
];

// filter items by the given role
const filterItemByRole = (items, role) => {
  const newItems = [];
  if (!role) return newItems;

  items.forEach((item) => {
    const newItem = Object.assign({}, item);
    if (newItem.roles && !newItem.roles.includes(role)) return;
    if (newItem.children) newItem.children = filterItemByRole(newItem.children, role);
    newItems.push(newItem);
  });
  return newItems;
};

function PageLayout() {
  const { loginStore, userStore } = useStore();
  const userInfo = userStore.userInfo ? userStore.userInfo : {};

  // logout function
  const navigate = useNavigate();
  const logout = function () {
    loginStore.logout();
    userStore.clearUserInfo();
    navigate("/login");
    message.success("logout");
  };

  // the user menu itmes
  const userItems = [
    {
      key: "1",
      label: (
        <span>
          Sign in as{" "}
          <span style={{ color: "gray" }}>
            {userInfo.username ? userInfo.username : "[Anonymity]"}
          </span>
        </span>
      ),
      disabled: true,
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: <span onClick={logout}>Logout</span>,
    },
  ];

  return (
    <Layout style={{ height: "100vh" }}>
      <Header className={styles.header}>
        <span className={styles.logo}>LabMan</span>
        <span className={styles.toolbar}>
          <Space>
            <Notification.Bell />
            <Dropdown
              menu={{ items: userItems }}
              arrow={true}
              placement="bottomLeft"
            >
              <span>
                <Avatar
                  size="small"
                  icon={<UserOutlined />}
                  style={{ backgroundColor: "#87d068" }}
                />
                ▾
              </span>
            </Dropdown>
          </Space>
        </span>
      </Header>
      <Layout>
        <Sider width={200}>
          <Menu
            mode="inline"
            onClick={(e) => {
              navigate(e.key);
            }}
            items={filterItemByRole(siderItems, userInfo.role)}
            style={{ height: "100%", borderRight: 0 }}
          />
        </Sider>
        <Layout style={{ padding: "16px 16px" }}>
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  );
}

// add feature that redirect to `/login` if the user is not logged in
export default withAuth(PageLayout, [], <Navigate to="/login" />);
