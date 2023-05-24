import qs from "qs";
import dayjs from "dayjs";
import { request } from "../utils";

class BorrowStore {
  getBorrows = async (params) => {
    return await request.get("/borrow/?" + qs.stringify(params));
  };

  getBorrow = async (id) => {
    return await request.get(`/borrow/${id}/`);
  };

  addBorrow = async (equip) => {
    return await request.post("/borrow/", equip);
  };

  modBorrow = (id, equip) => {
    return request.put(`/borrow/${id}/`, equip);
  };

  delBorrow = async (id) => {
    return request.delete(`/borrow/${id}/`);
  };

  backEquip = async (id) => {
    return request.put(`/borrow/${id}/back/`);
  }

  getReminderCount = async () => {
    return await request.get("/borrow/reminder/count/");
  };

  getReminders = async () => {
    return await request.get("/borrow/reminder/");
  };
}

export default BorrowStore;
