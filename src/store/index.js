// unified export for all store modules (singleton pattern)
import React from "react";
import LoginStore from "./login.Store";
import UserStore from "./user.Store";
import EquipStore from "./equip.Store";
import BorrowStore from "./borrow.Store";

class RootStore {
  constructor() {
    this.loginStore = new LoginStore();
    this.userStore = new UserStore();
    this.equipStore = new EquipStore();
    this.borrowStore = new BorrowStore();
    // ...
  }
}

// instantiate the root store (singleton pattern)
const rootStore = new RootStore();
const context = React.createContext(rootStore);
const useStore = () => React.useContext(context);
// const useStore = () => rootStore;

// useStore can be used as a unified export method
export { useStore };
