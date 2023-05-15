import { useNavigate } from "react-router-dom";
import { message } from "antd";

import { useStore } from "../../../store";
import EquipmentForm from "../../../components/EquipForm";

export default function Equipment() {
  const navigate = useNavigate();
  const { equipStore } = useStore();
  const handleFinish = (form) => {
    equipStore
      .addEquip(form)
      .then(() => message.success("create successfully"))
      .then(() => navigate("/equipment"));
  };

  return <EquipmentForm onFinish={handleFinish} />;
}
