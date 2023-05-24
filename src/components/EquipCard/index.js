import { Card } from "antd";

export default function EquipCard({equip}) {
  if (equip) {
    return (
      <Card
        hoverable
        style={{ margin: "32px" }}
        bordered={false}
        cover={<img style={{ padding: "32px" }} src={equip.photo} />}
      >
        <Card.Meta
          title={equip.name}
          description={
            <pre style={{ overflow: "auto" }}>{equip.description}</pre>
          }
        />
      </Card>
    );
  }
  return null;
}
