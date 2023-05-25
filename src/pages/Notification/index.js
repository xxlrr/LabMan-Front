import dayjs from "dayjs";
import { Avatar, Badge, Tooltip, List, Image, Space } from "antd";
import { BellOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../../store";
import styles from "./index.module.css";


function Bell() {
  const { borrowStore } = useStore();
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      borrowStore.getReminderCount().then((res) => setCount(res.count));
    }, 10 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Tooltip title={"You have " + (count || "no") + " notifications"}>
      <Link to="/notification/">
        <Avatar
          style={{ backgroundColor: "#ffffff" }}
          icon={
            <Badge dot={count}>
              <BellOutlined />
            </Badge>
          }
        />
      </Link>
    </Tooltip>
  );
}

const fitToItem = (borrow) => {
  const item = {id: borrow.id, equipName: borrow.equip.name, equipPhoto:borrow.equip.photo, }

  const equip = borrow.equip;
  const borrowTime = dayjs(borrow.borrow_time).toString();
  const dueTime = dayjs(borrow.borrow_time).add(borrow.duration, "day").toString();

  switch (borrow.state) {
    case "BORROWING":
      item.status = "warning";
      item.description = "Equipment '" + equip.name + "' you borrowed at " + borrowTime
          + " is coming due at " + dueTime + ", please return it on time.";
      break;
    case "MISSING":
      item.status = "error";
      item.description = "Equipment '" + equip.name + "' you borrowed at " + borrowTime
          + " should be returned before " + dueTime + ". You are overdue,"
          + " please return it as soon as possible.";
      break;
    default:
      item.status = "default"
      item.description = "Equipment '" + equip.name + "' you borrowed at " + borrowTime
          + " should be returned before " + dueTime + ", please note the return time.";
  }

  return item;
};

function Item({borrow}) {
  const item = fitToItem(borrow);

  return (
    <List.Item
      key={item.id}
      className={styles.item}
      extra={
        <Image
          height="70px"
          className={styles.image}
          src={item.equipPhoto}
        />
      }
    >
      <List.Item.Meta
        title={
          <Space>
            <Badge status={item.status} />
            <Link to="/borrow/">{item.equipName}</Link>
          </Space>
        }
        description={item.description}
      />
    </List.Item>
  );
}

function Notification() {
  const [reminders, setReminders] = useState([]);
  const { borrowStore } = useStore();

  useEffect(() => {
    borrowStore.getReminders().then(setReminders);
  }, []);

  return (
    <List
      size="large"
      itemLayout="horizontal"
      dataSource={reminders}
      renderItem={(item) => <Item borrow={item} />}
    />
  );
}

Notification.Bell = Bell;
export default Notification;
