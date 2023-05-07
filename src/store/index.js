// unified export for all store modules (singleton pattern)
import React from "react";
import LoginStore from "./login.Store";
import UserStore from "./user.Store";
import EquipStore from "./equip.Store";

// import { configure } from "mobx"
// configure({
//   enforceActions: "never",
// })

class RootStore {
  constructor() {
    this.loginStore = new LoginStore();
    this.userStore = new UserStore();
    this.equipStore = new EquipStore();
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
