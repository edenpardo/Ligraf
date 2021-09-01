import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";
import CommonStore from "./commonStore";
import CustomerStore from "./customerStore";

interface Store {
  activityStore: ActivityStore;
  customerStore: CustomerStore;
  commonStore:CommonStore;
}

export const store: Store = {
  activityStore: new ActivityStore(),
  customerStore:new CustomerStore(),
  commonStore:new CommonStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
