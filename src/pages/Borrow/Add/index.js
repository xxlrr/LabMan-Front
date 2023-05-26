import dayjs from "dayjs";
import {
  Layout,
  Button,
  Form,
  Select,
  Row,
  Col,
  InputNumber,
  Typography,
  Space,
  message,
} from "antd";
import { useState, useEffect } from "react";
import { useStore } from "../../../store";

import styles from "./index.module.css";
import EquipCard from "../../../components/EquipCard";
import { withAuth } from "../../../components/Authorize";

const { Content } = Layout;
const { Text } = Typography;

function Add() {
  const { equipStore, userStore, borrowStore } = useStore();
  const [form] = Form.useForm();
  const [userList, setUserList] = useState([]);
  const [equipList, setEquipList] = useState([]);
  const [currEquip, setCurrEquip] = useState(null);
  const [dueTime, setDueTime] = useState(null);

  useEffect(() => {
    // fetch all equips and set equip list (very expensive operation)
    equipStore.getEquips().then((res) => {
      setEquipList(res.list);
    });
    // fetch all users and set equip list (very expensive and dangerious operation)
    userStore.getUsers().then((res) => {
      setUserList(res.list);
    });
    // update dueTime
    updateDueTime();
  }, []);

  // calculate the due time by borrow_time and duration, and set the dueTime state.
  const updateDueTime = () => {
    let duration = form.getFieldValue("duration");
    if (duration) {
      let dueTime = dayjs().add(duration, "day");
      setDueTime(dueTime.format("YYYY-MM-DD HH:mm:ss"));
    } else {
      setDueTime(null);
    }
  };

  const handleFinish = (params) => {
    borrowStore
      .addBorrow(params)
      .then(() => {
        currEquip.stock -= 1;
        form.resetFields();
        setCurrEquip(null);
        message.success("create successfully");
      })
      .catch((e) => {
        const msg = e.response ? e.response.data.message : e.message;
        message.warning(msg);
      });
  };

  return (
    <Content className={styles.content}>
      <Row gutter={24}>
        <Col span={12}>
          <Form
            className={styles.form}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            onFinish={handleFinish}
            form={form}
            autoComplete="off"
          >
            <Form.Item
              label="Equipment"
              name="equip_id"
              rules={[
                {
                  required: true,
                  message: "Please select",
                },
              ]}
            >
              <Select
                showSearch
                placeholder="Please select"
                optionFilterProp="label"
                onChange={(_, option) => setCurrEquip(option.equip)}
                options={equipList.map((equip) => ({
                  label: equip.name,
                  value: equip.id,
                  equip: equip,
                }))}
              />
            </Form.Item>
            <Form.Item
              label="Borrower"
              name="user_id"
              rules={[
                {
                  required: true,
                  message: "Please select",
                },
              ]}
            >
              <Select
                showSearch
                placeholder="Please select"
                optionFilterProp="label"
                options={userList.map((user) => ({
                  label: user.username,
                  value: user.id,
                  user: user,
                }))}
              />
            </Form.Item>
          <Form.Item label="Duration">
          <Space>
            <Form.Item
              noStyle
              name="duration"
              initialValue={7}
              rules={[
                {
                  required: true,
                  message: "Please input",
                },
              ]}
            >
              <InputNumber min={1} onChange={updateDueTime}/>
              </Form.Item>
                <Text type="secondary">Due Time: {dueTime}</Text>
              </Space>
            </Form.Item>
            <Form.Item
              label="Stock"
              rules={[
                {
                  required: true,
                  message: "Please enter",
                },
              ]}
            >
              {currEquip?.stock}
            </Form.Item>
            <Form.Item noStyle>
              <Button
                type="primary"
                htmlType="submit"
                className={styles.btn}
                // stock <= 0, submit shouldn't be enabled.
                disabled={currEquip?.stock <= 0}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
        {/* the equipment preview */}
        <Col span={11}>
          <EquipCard equip={currEquip} />
        </Col>
      </Row>
    </Content>
  );
}

export default withAuth(Add, ["Manager"]);
