import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Customer } from "../models/customer";

export default class CustomerStore {
  customerRegistry = new Map<string, Customer>();
  selectedCustomer: Customer | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = true;

  constructor() {
    makeAutoObservable(this);
  }
  loadCustomers = async () => {
    this.loadingInitial = true;
    try {
      const customers = await agent.Customers.list();
      customers.forEach((customer) => {
        this.setCustomer(customer);
      });
      //console.log(customers);
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  loadCustomer= async(id:string)=>{
    let customer = this.getCustomer(id);
    if (customer){
      this.selectedCustomer=customer;
      return customer;
    }
    else{
      this.loadingInitial=true;
      try{
        customer=await agent.Customers.details(id);
        this.setCustomer(customer);
        runInAction(()=>{
          this.selectedCustomer=customer;
        })
        this.setLoadingInitial(false);
        return customer;
      }catch (error){
        console.log(error);
        this.setLoadingInitial(false);

      }
    }
  }

  private setCustomer = (customer: Customer) => {
    this.customerRegistry.set(customer.id, customer);
  };
  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  private getCustomer = (id: string) => {
    return this.customerRegistry.get(id);
  };
  createCustomer = async (customer: Customer) => {
    this.loading = true;
    try {
      await agent.Customers.create(customer);
      runInAction(() => {
        this.customerRegistry.set(customer.id, customer);
        //this.selectedCustomer = customer;
        //this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };
  updateCustomer = async (customer: Customer) => {
    this.loading = true;
    try {
      await agent.Customers.update(customer);
      runInAction(() => {
        this.customerRegistry.set(customer.id, customer);
        this.selectedCustomer = customer;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  deleteCustomer = async (id: string) => {
    this.loading = true;
    try {
      await agent.Customers.delete(id);
      runInAction(() => {
        this.customerRegistry.delete(id);
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };
}
