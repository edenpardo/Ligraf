import { ContactSupportOutlined } from "@material-ui/icons";
import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { PVCTask } from "../models/pvcTask";

export default class PVCTaskStore {
  pvcTaskRegistry = new Map<string, PVCTask>();
  selectedPVCTask: PVCTask | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = false;

  constructor() {
    makeAutoObservable(this);
  }

  loadPVCTasks = async () => {
    this.loadingInitial = true;
    try {
      const pvcTasks = await agent.PVCTasks.list();
      pvcTasks.forEach((pvcTasks) => {
        this.setpvcTask(pvcTasks);
      });
      console.log(this.pvcTaskRegistry);
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  private setpvcTask = (pvcTask: PVCTask) => {
    this.pvcTaskRegistry.set(pvcTask.id, pvcTask);
  };
  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };
  loadPVCTask = async (id: string) => {
    let pvcTask = this.getPVCTask(id);
    if (pvcTask) {
      this.selectedPVCTask = pvcTask;
      return pvcTask;
    } else {
      this.loadingInitial = true;
      try {
        pvcTask = await agent.PVCTasks.details(id);
        this.setpvcTask(pvcTask);
        runInAction(() => {
          this.selectedPVCTask = pvcTask;
        });
        this.setLoadingInitial(false);
        return pvcTask;
      } catch (error) {
        console.log(error);
        this.setLoadingInitial(false);
      }
    }
  };

  private getPVCTask = (id: string) => {
    return this.pvcTaskRegistry.get(id);
  };

  createPVCTask = async (pvcTask: PVCTask) => {
    this.loading = true;
    try {
      await agent.PVCTasks.create(pvcTask);
      runInAction(() => {
        this.pvcTaskRegistry.set(pvcTask.id, pvcTask);
        this.selectedPVCTask = pvcTask;
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
  updatePVCTask = async (pvcTask: PVCTask) => {
    console.log(pvcTask);
    this.loading = true;
    try {
      await agent.PVCTasks.update(pvcTask);
      runInAction(() => {
        this.pvcTaskRegistry.set(pvcTask.id, pvcTask);
        this.selectedPVCTask = pvcTask;
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
}
