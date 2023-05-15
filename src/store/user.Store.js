import { makeAutoObservable } from "mobx";
import { request, setUserInfo, getUserInfo, removeUserInfo } from "../utils";

class UserStore {
  userInfo = getUserInfo();

  constructor() {
    makeAutoObservable(this);
  }

  // fetch user info by calling the user profile API
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
}

export default UserStore;
