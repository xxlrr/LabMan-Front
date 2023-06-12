import { useNavigate } from "react-router-dom";
import { message } from "antd";

import { useStore } from "../../../store";
import { withAuth } from "../../../components/Authorize";
import EquipmentForm from "../../../components/EquipForm";

function Equipment() {
  const navigate = useNavigate();
  const { equipStore } = useStore();
  const handleFinish = (form) => {
    equipStore
      .addEquip(form)
      .then(() => {
        message.success("create successfully");
        navigate("/equipment");
      });
  };

  return <EquipmentForm onFinish={handleFinish} />;
}

export default withAuth(Equipment, ["Manager"]);
