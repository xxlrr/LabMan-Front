import { Avatar, Badge, Tooltip } from "antd";
import { BellOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

import { useStore } from "../../store";
import { Link } from "react-router-dom";

function Bell() {
  const { borrowStore } = useStore();
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      borrowStore.getReminderCount().then((res) => setCount(res.count));
    }, 10 * 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    console.log("aaaa");
    setTitle("You have " + (count || "no") + " notifications");
  }, [count]);

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

function Notification() {
  return <>Notification</>;
}

Notification.Bell = Bell;
export default Notification;
