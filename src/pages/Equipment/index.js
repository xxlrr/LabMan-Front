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
  Image,
  Tag,
  Tooltip,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useState, useEffect, useRef, useMemo } from "react";
import { useStore } from "../../store";

import styles from "./index.module.css";

const { Content } = Layout;
const { Option } = Select;

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    ellipsis: true,
    width: 150,
  },
  {
    title: "Picture",
    dataIndex: "picture",
    key: "picture",
    ellipsis: true,
    width: 120,
    render: (data) => (
      <Image
        alt=""
        width={50}
        height={50}
        src={
          data
            ? data
            : "data:image/png;base64,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"
        }
      />
    ),
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
    ellipsis: true,
    width: 120,
    render: (text) => text ? <Tag color="geekblue">{text}</Tag> : "-",
  },
  {
    title: "Stock",
    dataIndex: "stock",
    width: 80,
    key: "stock",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    ellipsis: true,
    render: (text) => (
      <Tooltip placement="topLeft" title={text}>
        {text}
      </Tooltip>
    ),
  },
  {
    title: "State",
    dataIndex: "state",
    width: 120,
    key: "state",
    render: (text) => (
      <Tag color={text === "available" ? "green" : "volcano"}>{text}</Tag>
    ),
  },
  {
    title: "Action",
    dataIndex: "",
    key: "action",
    render: () => (
      <Space size="small" wrap>
        <Button type="link" onClick={() => {}}>
          Edit
        </Button>
        <Button type="link" danger onClick={() => {}}>
          Delete
        </Button>
      </Space>
    ),
  },
];

const SearchForm = ({ onFinish, onClear }) => {
  return (
    <Form name="search" size="small" onFinish={onFinish}>
      <Row gutter={24}>
        <Col span={8}>
          <Form.Item name="name" label="Equipment Name">
            <Input placeholder="e.g. ThinkBook 15 Gen 4" />
          </Form.Item>
        </Col>
        <Col span={5}>
          <Form.Item name="category" label="Category">
            <Input placeholder="e.g. Laptop" />
          </Form.Item>
        </Col>
        <Col span={5}>
          <Form.Item name="state" label="State">
            <Select placeholder="Please select" allowClear>
              <Option key="available" value="available">
                Available
              </Option>
              <Option key="unavailable" value="unavailable">
                Unavailable
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

function Equipment() {
  const refContent = useRef();
  const { equipStore } = useStore();

  const [params, setParams] = useState({});
  const [pagination, setPagination] = useState({});
  const [scrollHeight, setScrollHeight] = useState(184);
  const [data, setData] = useState({});

  useEffect(() => {
    // resize the table-scroll based on the height of the Content component
    const resizeScrollY = () => {
      setScrollHeight(refContent.current.clientHeight - 250);
    };

    // load the table for the first time and then resize
    equipStore.getEquips().then(setData).then(resizeScrollY);

    window.addEventListener("resize", resizeScrollY);
    return () => window.removeEventListener("resize", resizeScrollY);
  }, []);

  // update data when params or pagination is changed.
  useEffect(() => {
    const { current, pageSize } = pagination;
    equipStore.getEquips({ ...params, current, pageSize }).then(setData);
  }, [params, pagination]);

  return (
    <Content ref={refContent} className={styles.content}>
      <Table
        className={styles.table}
        dataSource={data.list}
        columns={columns}
        pagination={{ ...pagination, total: data.total, showSizeChanger: true }}
        tableLayout="fixed"
        scroll={{ y: scrollHeight }}
        title={() => (
          <SearchForm
            onFinish={(values) => {
              setParams(values);
              setPagination({current:1});
            }}
            onClear={() => {
              setParams({});
              setPagination({current:1});
            }}
          />
        )}
        onChange={setPagination}
      />
    </Content>
  );
}

export default Equipment;
