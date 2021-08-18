import axios, { AxiosResponse } from "axios";
import { Activity } from "../models/activity";
import { Customer } from "../models/customer";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.response.use(async (response) => {
  try {
    await sleep(1000);
    return response;
  } catch (error) {
    console.log(error);
    return await Promise.reject(error);
  }
});
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
  details: (id:string)=> requests.get<Activity>(`/activities/${id}`),
  create:(activity:Activity)=>axios.post<void>('/activities',activity),
  update:(activity:Activity)=>axios.put<void>(`/activities/${activity.id}`,activity),
  delete: (id:string)=>axios.delete<void>(`/activities/${id}`),
};

const Customers = {
  list: () => requests.get<Customer[]>("/customers"),
  details: (id:string)=> requests.get<Customer>(`/customers/${id}`),
  create:(customer:Customer)=>axios.post<void>('/customers',customer),
  update:(customer:Customer)=>axios.put<void>(`/customers/${customer.id}`,customer),
  delete: (id:string)=>axios.delete<void>(`/customers/${id}`),
};
const agent = {
  Activities,
  Customers,
};

export default agent;
