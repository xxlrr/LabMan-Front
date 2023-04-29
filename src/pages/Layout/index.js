import { Layout, Menu, Dropdown, message } from "antd";
import { useNavigate, Navigate } from "react-router-dom";
import React from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "./index.css";
import { useStore } from "../../store";

const { Header, Content, Sider } = Layout;

function PageLayout() {
  const { loginStore, userStore } = useStore();

  // logout function
  const navigate = useNavigate();
  const logout = async function () {
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

  // the sider menu times
  const sider_items = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
    (icon, index) => {
      const key = String(index + 1);
      return {
        key: `sub${key}`,
        icon: React.createElement(icon),
        label: `subnav ${key}`,
        children: new Array(4).fill(null).map((_, j) => {
          const subKey = index * 4 + j + 1;
          return {
            key: subKey,
            label: `option${subKey}`,
          };
        }),
      };
    }
  );

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
              <span>{userStore.userInfo.username || "[Anonymity]"}</span>
            </Dropdown>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200}>
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
            items={sider_items}
          />
        </Sider>
        <Layout style={{ padding: "16px 16px" }}>
          <Content className="content">Content</Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default PageLayout;
