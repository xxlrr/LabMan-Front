import qs from "qs";
import { request } from "../utils";

class EquipStore {
  // get the equipment list
  getEquips = async (params) => {
    return await request.get("/equipment/?" + qs.stringify(params));
  };

  // get a equipment info
  getEquip = async (id) => {
    return await request.get(`/equipment/${id}/`);
  };

  // add a equipment
  addEquip = async (equip) => {
    return await request.post("/equipment/", equip);
  };

  // modify a equipment
  modEquip = async (id, equip) => {
    return await request.put(`/equipment/${id}/`, equip);
  };

  // delete a equipment
  delEquip = async (id) => {
    return await request.delete(`/equipment/${id}/`);
  };
}

export default EquipStore;
