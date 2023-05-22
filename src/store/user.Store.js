import qs from "qs";
import { request, setUserInfo, getUserInfo, removeUserInfo } from "../utils";

class UserStore {
  userInfo = getUserInfo();

  // fetch tje current user info by calling the user profile API
  fetchUserInfo = async () => {
    const res = await request.get("/user/profile/");
    this.setUserInfo(res);
  };

  setUserInfo = (userInfo) => {
    this.userInfo = userInfo;
    setUserInfo(userInfo);
  };

  clearUserInfo = () => {
    this.userInfo = null;
    removeUserInfo();
  };

  getUsers = async (params) => {
    return await request.get(`/users/?${qs.stringify(params)}`);
  };

  getUser = async (id) => {
    return await request.get(`/users/${id}/`);
  };

  delUser = async (id) => {
    return await request.delete(`/users/${id}/`);
  };

  addUser = async (params) => {
    return await request.post("/users/", params);
  };

  modUser = async (id, params) => {
    return await request.put(`/users/${id}/`, params);
  };
}

export default UserStore;
