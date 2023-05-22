import qs from "qs";
import { request } from "../utils";

class EquipStore {
  getEquips = async (params) => {
    return await request.get("/equipment/?" + qs.stringify(params));
  };

  getEquip = async (id) => {
    return await request.get(`/equipment/${id}/`);
  };

  addEquip = async (equip) => {
    return await request.post("/equipment/", equip);
  };

  modEquip = async (id, equip) => {
    return await request.put(`/equipment/${id}/`, equip);
  };

  delEquip = async (id) => {
    return await request.delete(`/equipment/${id}/`);
  };
}

export default EquipStore;
