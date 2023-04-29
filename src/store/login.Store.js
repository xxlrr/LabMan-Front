// login module
import { makeAutoObservable } from "mobx";
import { request, getToken, setToken, removeToken } from "../utils";

class LoginStore {
  token = getToken() || "";
  constructor() {
    // for mobx
    makeAutoObservable(this);
  }

  // login
  login = async (username, password) => {
    // call the login API
    const res = await request.post("/login", {
      username,
      password,
    });

    // store the token
    this.token = res.token;
    setToken(res.token);
  };

  // logout
  logout = () => {
    this.token = "";
    removeToken();
  };
}

export default LoginStore;
