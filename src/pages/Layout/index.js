import React from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Layout, Menu, Dropdown, message, Avatar, Space } from "antd";
import {
  LaptopOutlined,
  SnippetsOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { useStore } from "../../store";
import Notification from "../Notification";

import styles from "./index.module.css";

const { Header, Sider } = Layout;

// the sider menu items
const sider_items = [
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
  const new_items = [];
  if (!role) return new_items;

  items.forEach((item) => {
    const new_item = Object.assign({}, item);
    if (new_item.roles && !new_item.roles.includes(role)) return;
    if (new_item.children) new_item.children = filterItemByRole(new_item.children, role);
    new_items.push(new_item);
  });
  return new_items;
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
  const user_items = [
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
              menu={{ items: user_items }}
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
            items={filterItemByRole(sider_items, userInfo.role)}
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

export default PageLayout;
