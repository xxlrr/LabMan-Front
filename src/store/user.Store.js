import qs from "qs";
import { request, setUserInfo, getUserInfo, removeUserInfo } from "../utils";

/* Some functions have never been used.
 * The reason for this implementation is to
 * ensure the integrity of the interface and 
 * prepare for future user management functions
 */
class UserStore {
  userInfo = getUserInfo();

  // fetch tje current user info by calling the user profile API
  fetchUserInfo = async () => {
    const res = await request.get("/user/profile/");
    this.setUserInfo(res);
  };

  // set the current user info.
  /* A little duplicate with utils.user.
   * exists for mobx before, but the mobx
   * is not used now.
   */ 
  setUserInfo = (userInfo) => {
    this.userInfo = userInfo;
    setUserInfo(userInfo);
  };

  // clear the current user info.
  /* A little duplicate with utils.user.
   * exists for mobx before, but the mobx
   * is not used now.
   */ 
  clearUserInfo = () => {
    this.userInfo = null;
    removeUserInfo();
  };

  // get the user list from the server.
  getUsers = async (params) => {
    return await request.get(`/users/?${qs.stringify(params)}`);
  };

  // get a user info from the server.
  getUser = async (id) => {
    return await request.get(`/users/${id}/`);
  };

  // delete a user.
  delUser = async (id) => {
    return await request.delete(`/users/${id}/`);
  };

  // add a user to server.
  addUser = async (params) => {
    return await request.post("/users/", params);
  };

  // modify a user info.
  modUser = async (id, params) => {
    return await request.put(`/users/${id}/`, params);
  };
}

export default UserStore;
