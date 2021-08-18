import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";
import CustomerStore from "./customerStore";

interface Store {
  activityStore: ActivityStore;
  customerStore: CustomerStore;
}

export const store: Store = {
  activityStore: new ActivityStore(),
  customerStore:new CustomerStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
