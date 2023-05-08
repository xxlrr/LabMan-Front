import qs from "qs";
import { request } from "../utils";

class EquipStore {
  getEquips = async (params) => {
    const res = await request.get("/equipment?" + qs.stringify(params));
    return res;
  };

  addEquip = async (equip) => {
    const res = await request.post("/equipment/", equip);
    return res;
  };

  modEquip = (id, equip) => {
    const res = request.put(`/equipment/${id}`, equip);
    return res;
  };

  delEquip = async (id) => {
    const res = request.delete(`/equipment/${id}`);
    return res;
  };
}

export default EquipStore;
