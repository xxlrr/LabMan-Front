import React from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import { useStore } from "../../store";

import styles from "./index.module.css";

function Login() {
  const navigate = useNavigate();
  const { loginStore, userStore } = useStore();

  // login and redirect
  async function onFinish(values) {
    try {
      const { username, password } = values;
      await loginStore.login(username, password);
      await userStore.fetchUserInfo();
      navigate("/");
      message.success("login");
    } catch (e) {
      const msg = e.response ? e.response.data.message : e.message;
      message.warning(msg);
    }
  }

  return (
    <div className={styles.loginBox}>
      <h4>LabMan - Login</h4>
      <Form
        initialValues={{ username: "", password: "" }}
        onFinish={onFinish}
        layout="vertical"
        requiredMark={false}
        autoComplete="off"
      >
        <Form.Item
          label="Username (e.g. a1234567)"
          name="username"
          rules={[
            { required: true, message: "This field cannot be left blank" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: "This field cannot be left blank" },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;
