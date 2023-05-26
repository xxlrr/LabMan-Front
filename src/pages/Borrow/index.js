import dayjs from "dayjs";
import {
  Layout,
  Form,
  Row,
  Col,
  Select,
  Input,
  Button,
  Space,
  Table,
  Tag,
  Modal,
  message,
  Typography,
  Popover,
} from "antd";
import { SearchOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../store";

import Add from "./Add";
import Edit from "./Edit";

import styles from "./index.module.css";

const { Content } = Layout;
const { Option } = Select;

const COLUMNS = [
  {
    title: "Equipment Name",
    dataIndex: ["equip", "name"],
    key: "quip_name",
    ellipsis: true,
    width: 150,
    render: (text, row) => {
      return (
        <Popover
          mouseEnterDelay={0.3}
          placement="rightTop"
          title={
            <Space>
              <Typography.Text>{text}</Typography.Text>
              <Typography.Text type="secondary">
                {row.equip.category}
              </Typography.Text>
            </Space>
          }
          content={<pre>{row.equip.description}</pre>}
        >
          {text}
        </Popover>
      );
    },
  },
  {
    title: "State",
    dataIndex: "state",
    width: 120,
    key: "state",
    render: (text) => {
      const colors = {
        BORROWING: "processing",
        RETURNED: "success",
        LATE: "warning",
        MISSING: "error",
      };
      return <Tag color={colors[text]}>{text}</Tag>;
    },
  },
  {
    title: "Borrower",
    dataIndex: ["user", "username"],
    key: "borrower",
    ellipsis: true,
    width: 120,
  },
  {
    title: "Borrow Time",
    dataIndex: "borrow_time",
    key: "borrow_time",
    render: (text) => dayjs(text).format("YYYY-MM-DD HH:mm:ss"),
  },
  {
    title: "Due Time",
    dataIndex: "duration",
    key: "duration",
    render: (_, row) =>
      dayjs(row.borrow_time)
        .add(row.duration, "day")
        .format("YYYY-MM-DD HH:mm:ss"),
  },
  {
    title: "Return Time",
    dataIndex: "return_time",
    key: "return_time",
    render: (text) => (text ? dayjs(text).format("YYYY-MM-DD HH:mm:ss") : "-"),
  },
];

const SearchForm = ({ onFinish, onClear }) => {
  return (
    <Form name="search" size="small" onFinish={onFinish}>
      <Row gutter={24}>
        <Col span={8}>
          <Form.Item name="equip_name" label="Equipment Name">
            <Input placeholder="e.g. ThinkBook 15 Gen 4" />
          </Form.Item>
        </Col>
        <Col span={5}>
          <Form.Item name="borrower" label="Borrower">
            <Input placeholder="e.g. a1234567" />
          </Form.Item>
        </Col>
        <Col span={5}>
          <Form.Item name="state" label="State">
            <Select placeholder="Please select" allowClear>
              <Option key="BORROWING" value="BORROWING">
                Borrowing
              </Option>
              <Option key="RETURNED" value="RETURNED">
                Returned
              </Option>
              <Option key="LATE" value="LATE">
                Late
              </Option>
              <Option key="MISSING" value="MISSING">
                Missing
              </Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item>
            <Space wrap>
              <Button
                type="primary"
                htmlType="submit"
                icon={<SearchOutlined />}
              >
                Search
              </Button>
              <Button htmlType="reset" onClick={onClear}>
                Clear
              </Button>
            </Space>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

function Borrow() {
  const navigate = useNavigate();
  const { borrowStore, userStore } = useStore();

  const [params, setParams] = useState({});
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [data, setData] = useState({});

  // update the data of the current page
  const updateTable = () => {
    const { current, pageSize } = pagination;
    borrowStore.getBorrows({ ...params, current, pageSize }).then(setData);
  };

  // update data when params or pagination is changed.
  useEffect(updateTable, [params, pagination]);

  const showReturnConfirm = (equip) => {
    Modal.confirm({
      title: "Are you sure return it?",
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      async onOk() {
        try {
          await borrowStore.backEquip(equip.id);
          message.success("Return successfully");
          updateTable();
        } catch (e) {
          const msg = e.response ? e.response.data.message : e.message;
          message.warning(msg);
        }
      },
    });
  };

  const showDeleteConfirm = (equip) => {
    Modal.confirm({
      title: "Are you sure delete it?",
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      async onOk() {
        await borrowStore.delBorrow(equip.id);
        message.success("Delete successfully");
        updateTable();
      },
    });
  };


  // add the action column if the current is a manager.
  const userInfo = userStore.userInfo;
  const columns = userInfo.role === "Manager" ? [
    ...COLUMNS,
    {
      title: "Action",
      dataIndex: "",
      key: "action",
      render: (_, row) => (
        <Space size="small" wrap>
          {row.return_time ? null : (
            <Typography.Link onClick={() => showReturnConfirm(row)}>
              Return
            </Typography.Link>
          )}
          <Typography.Link
            type="success"
            onClick={() => navigate(`/borrow/edit/${row.id}`)}
          >
            Edit
          </Typography.Link>
          <Typography.Link
            type="warning"
            onClick={() => showDeleteConfirm(row)}
          >
            Delete
          </Typography.Link>
        </Space>
      ),
    },
  ] : COLUMNS;

  return (
    <Content className={styles.content}>
      <Table
        rowKey="id"
        className={styles.table}
        dataSource={data.list}
        columns={columns}
        pagination={{ ...pagination, total: data.total, showSizeChanger: true }}
        title={() => (
          <SearchForm
            onFinish={(values) => {
              setParams(values);
              setPagination({ ...pagination, current: 1 });
            }}
            onClear={() => {
              setParams({});
              setPagination({ ...pagination, current: 1 });
            }}
          />
        )}
        onChange={setPagination}
      />
    </Content>
  );
}

Borrow.Add = Add;
Borrow.Edit = Edit;

export default Borrow;
