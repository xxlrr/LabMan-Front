import {
  Layout,
  Button,
  Form,
  Select,
  Row,
  Col,
  Input,
  InputNumber,
  Typography,
  Space,
  DatePicker,
  message,
} from "antd";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { useStore } from "../../../store";

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
  const [equipStock, setEquipStock] = useState(0);

  useEffect(() => {
    equipStore.getEquips().then((res) => {
      setEquipList(res.list);
    });
    userStore.getUsers().then((res) => {
      setUserList(res.list);
    });
    borrowStore.getBorrow(params.id).then((res) => {
      let values = {
        ...res,
        user_id: res.user.id,
        equip_id: res.equip.id,
        borrow_time: dayjs(res.borrow_time),
        return_time: res.return_time && dayjs(res.return_time),
      };
      form.setFieldsValue(values);
      setEquipStock(res.equip.stock);
    });
  }, []);

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
                onChange={(_, option) => setEquipStock(option.stock)}
                options={equipList.map((equip) => ({
                  label: equip.name,
                  value: equip.id,
                  stock: equip.stock,
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
                }))}
              />
            </Form.Item>
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
                format="YYYY-MM-DD HH:mm:ss"
                showTime={{ defaultValue: dayjs("00:00:00", "HH:mm:ss") }}
              />
            </Form.Item>
            <Form.Item
              label="Duration"
              name="duration"
              initialValue={7}
              rules={[
                {
                  required: true,
                  message: "Please input",
                },
              ]}
            >
              <Space size="large">
                <InputNumber min={1} value={7} />
                <Text type="secondary">Due Time: 2012-01-01 12:00:00</Text>
              </Space>
            </Form.Item>
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
              {equipStock}
            </Form.Item>
            <Form.Item noStyle>
              <Button type="primary" htmlType="submit" className={styles.btn}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Content>
  );
}

export default Edit;
