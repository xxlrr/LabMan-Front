import qs from "qs";
import { request } from "../utils";

class EquipStore {
  getEquips = async (params) => {
    const res = await request.get("/equipment?" + qs.stringify(params));
    return res;
  };

  addEquip = (equip) => {
    request.post("/api/books/", equip);
  };

  modEquip = (id, equip) => {
    request.put(`/api/books/${id}`, equip);
  };

  delEquip = (id) => {
    request.delete(`/api/books/${id}`);
  };
}

export default EquipStore;
