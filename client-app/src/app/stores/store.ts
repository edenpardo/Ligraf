import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";
import CommonStore from "./commonStore";
import CustomerStore from "./customerStore";
import ModalStore from "./modalStore";
import PVCTaskStore from "./pvcTaskStore";
import TaskStore from "./taskStore";
import UserStore from "./userStore";

interface Store {
  activityStore: ActivityStore;
  customerStore: CustomerStore;
  commonStore: CommonStore;
  userStore: UserStore;
  modalStore: ModalStore;
  taskStore:TaskStore;
  pvcTaskStore: PVCTaskStore;
}

export const store: Store = {
  activityStore: new ActivityStore(),
  customerStore: new CustomerStore(),
  commonStore: new CommonStore(),
  userStore: new UserStore(),
  modalStore: new ModalStore(),
  taskStore:new TaskStore(),
  pvcTaskStore: new PVCTaskStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
