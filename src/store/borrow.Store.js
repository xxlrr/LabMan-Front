import qs from "qs";
import { request } from "../utils";

class BorrowStore {
  // get borrowed records
  getBorrows = async (params) => {
    return await request.get("/borrow/?" + qs.stringify(params));
  };

  // get a borrowed record
  getBorrow = async (id) => {
    return await request.get(`/borrow/${id}/`);
  };

  // add a borrow
  addBorrow = async (equip) => {
    return await request.post("/borrow/", equip);
  };

  // update a borrow
  modBorrow = (id, equip) => {
    return request.put(`/borrow/${id}/`, equip);
  };

  // delete a borrow
  delBorrow = async (id) => {
    return request.delete(`/borrow/${id}/`);
  };

  // return a borrowed requipment
  backEquip = async (id) => {
    return request.put(`/borrow/${id}/back/`);
  }

  // get the number of reminders for the current user
  getReminderCount = async () => {
    return await request.get("/borrow/reminder/count/");
  };

  // get the reminder list for the current user
  getReminders = async () => {
    return await request.get("/borrow/reminder/");
  };
}

export default BorrowStore;
