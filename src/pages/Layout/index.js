import React from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { Layout, Menu, Dropdown, message } from "antd";
import {
  ProfileOutlined,
  SnippetsOutlined,
} from "@ant-design/icons";
import { useStore } from "../../store";

import "./index.css";

const { Header, Sider } = Layout;

// the sider menu times
const sider_items = [
  {
    roles: ["Manager"],
    key: "manage",
    icon: <ProfileOutlined />,
    children: [
      {
        label: "equipment list",
        key: "/equipment",
      },
      {
        label: "add equipment",
        key: "/equipment/add",
      },
    ],
    label: "Manage",
  },
  {
    key: "borrow",
    icon: <SnippetsOutlined />,
    children: [
      {
        label: "borrowing record",
        key: "/borrow",
      },
      {
        label: "add borrowing",
        key: "/borrow/add",
      },
    ],
    label: "Borrow",
  },
];

// filter items by the given role
const filterItemByRole = (items, role) => {
  const new_items = [];
  if (!role) return new_items;

  items.forEach((item) => {
    if (item.children) filterItemByRole(item.children);
    if (item.roles && !item.roles.includes(role)) return;
    new_items.push(item);
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

  // the user menu times
  const user_items = [
    {
      key: "1",
      label: <span onClick={logout}>Logout</span>,
    },
  ];

  return (
    <Layout style={{ height: "100vh" }}>
      <Header className="header">
        <div className="logo" />
        LabMan
        <div className="user">
          <span>
            <Dropdown
              menu={{ items: user_items }}
              arrow={true}
              placement="bottom"
            >
              <span>
                {userInfo.username ? userInfo.username : "[Anonymity]"}
              </span>
            </Dropdown>
          </span>
        </div>
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
