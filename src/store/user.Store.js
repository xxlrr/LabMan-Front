import { makeAutoObservable } from "mobx";
import { request } from "../utils";

class UserStore {
  userInfo = {};

  constructor() {
    makeAutoObservable(this);
  }

  // fetch user info by calling the user profile API
  fetchUserInfo = async () => {
    await request
      .get("/user/profile")
      .then((res) => (this.userInfo = res))
      .catch((err) => (this.userInfo = {}));
  };
}

export default UserStore;
