import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { message } from "antd";

import { useStore } from "../../../store";
import EquipmentForm from "../../../components/EquipForm";

export default function Equipment() {
  const params = useParams();
  const navigate = useNavigate();
  const { equipStore } = useStore();
  const [data, setData] = useState();
  const handleFinish = (form) => {
    equipStore
      .modEquip(params.id, form)
      .then(() => message.success("update successfully"))
      .then(() => navigate("/equipment"));
  };

  useEffect(() => {
    equipStore.getEquip(params.id).then(setData);
  }, []);

  return <EquipmentForm editData={data} onFinish={handleFinish} />;
}
