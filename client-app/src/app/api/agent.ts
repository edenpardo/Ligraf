import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { history } from "../..";
import { Activity } from "../models/activity";
import { Customer } from "../models/customer";
import { PVCTask } from "../models/pvcTask";
import { JobTask } from "../models/jobTask";
import { User, UserFormValues } from "../models/user";
import { store } from "../stores/store";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.request.use((config) => {
  const token = store.commonStore.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(
  async (response) => {
    await sleep(1000);
    return response;
  },
  (error: AxiosError) => {
    const { data, status, config } = error.response!;
    switch (status) {
      case 400:
        if (typeof data === "string") {
          toast.error(data);
        }
        if (config.method === "get" && data.errors.hasOwnProperty("id")) {
          history.push("/not-found");
        }
        if (data.errors) {
          const modalStateErrors = [];
          for (const key in data.errors) {
            if (data.errors[key]) modalStateErrors.push(data.errors[key]);
          }
          throw modalStateErrors.flat();
        }
        break;
      case 401:
        toast.error("unauthorised");
        break;
      case 404:
        history.push("/not-found");
        break;
      case 500:
        store.commonStore.setServerError(data);
        history.push("/server-error");
        break;
    }
    return Promise.reject(error);
  }
);
const responseBody = <T>(response: AxiosResponse<T>) => response.data;
const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Activities = {
  list: () => requests.get<Activity[]>("/activities"),
  details: (id: string) => requests.get<Activity>(`/activities/${id}`),
  create: (activity: Activity) => axios.post<void>("/activities", activity),
  update: (activity: Activity) =>
    axios.put<void>(`/activities/${activity.id}`, activity),
  delete: (id: string) => axios.delete<void>(`/activities/${id}`),
};

const Customers = {
  list: () => requests.get<Customer[]>("/customers"),
  details: (id: string) => requests.get<Customer>(`/customers/${id}`),
  create: (customer: Customer) => axios.post<void>("/customers", customer),
  update: (customer: Customer) =>
    axios.put<void>(`/customers/${customer.id}`, customer),
  delete: (id: string) => axios.delete<void>(`/customers/${id}`),
};
const JobTasks = {
  list: () => requests.get<JobTask[]>("/jobTasks"),
};
const PVCTasks = {
  list: () => requests.get<PVCTask[]>("/pvcTasks"),
  details: (id: string) => requests.get<PVCTask>(`/pvcTasks/${id}`),
  create: (pvcTask: PVCTask) => axios.post<void>("/pvcTasks", pvcTask),
  update: (pvcTask: PVCTask) =>
    axios.put<void>(`/pvcTasks/${pvcTask.id}`, pvcTask),
  //delete: (id: string) => axios.delete<void>(`/pvcTasks/${id}`),
};

const Account = {
  current: () => requests.get<User>("/account"),
  login: (user: UserFormValues) => requests.post<User>("/account/login", user),
  register: (user: UserFormValues) =>
    requests.post<User>("/account/register", user),
};
const agent = {
  Activities,
  Customers,
  Account,
  PVCTasks,
  JobTasks,
};

export default agent;
