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
  DatePicker,
  message,
} from "antd";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useStore } from "../../../store";

import { withAuth } from "../../../components/Authorize";
import EquipCard from "../../../components/EquipCard";

import styles from "./index.module.css";

const { Content } = Layout;
const { Text } = Typography;

function Edit() {
  const params = useParams();
  const navigate = useNavigate();

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
    // fetch the current borrow record and set the form.
    borrowStore.getBorrow(params.id).then((res) => {
      let values = {
        ...res,
        user_id: res.user.id,
        equip_id: res.equip.id,
        borrow_time: dayjs(res.borrow_time),
        return_time: res.return_time && dayjs(res.return_time),
      };
      form.setFieldsValue(values);
      setCurrEquip(res.equip);
      updateDueTime();
    });
  }, []);

  // calculate the due time by borrow_time and duration, and set the dueTime state.
  const updateDueTime = () => {
    let borrowTime = form.getFieldValue("borrow_time");
    let duration = form.getFieldValue("duration");
    if (borrowTime && duration) {
      let dueTime = dayjs(borrowTime).add(duration, "day");
      setDueTime(dueTime.format("YYYY-MM-DD HH:mm:ss"));
    } else {
      setDueTime(null);
    }
  };

  const handleFinish = (form) => {
    borrowStore
      .modBorrow(params.id, form)
      .then(() => {
        message.success("update successfully");
        navigate("/borrow");
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
            {/* equip list selector */}
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
            {/* user list selector */}
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
            {/* borrow time date picker */}
            <Form.Item
              label="Borrow Time"
              name="borrow_time"
              rules={[
                {
                  required: true,
                  message: "Please select",
                },
              ]}
            >
              <DatePicker
                onChange={updateDueTime}
                format="YYYY-MM-DD HH:mm:ss"
                showTime={{ defaultValue: dayjs("00:00:00", "HH:mm:ss") }}
              />
            </Form.Item>
            {/* duration input */}
            <Form.Item label="Duration">
              <Space>
                <Form.Item
                  noStyle
                  name="duration"
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
            {/* return time date picker */}
            <Form.Item label="Return Time" name="return_time">
              <DatePicker
                format="YYYY-MM-DD HH:mm:ss"
                showTime={{ defaultValue: dayjs("00:00:00", "HH:mm:ss") }}
              />
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
              <Button type="primary" htmlType="submit" className={styles.btn}>
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

export default withAuth(Edit, ["Manager"]);
