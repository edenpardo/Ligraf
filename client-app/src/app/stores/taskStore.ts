import { makeAutoObservable } from "mobx";
import agent from "../api/agent";
import { JobTask } from "../models/jobTask";


export default class TaskStore {
  jobTaskRegistry = new Map<string, JobTask>();
  selectedJobTask: JobTask | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = false;

  constructor() {
    makeAutoObservable(this);
  }


  get tasksByStatusWaitingForApprove() {
    return Array.from(this.jobTaskRegistry.values()).filter(
      (a, b) => a.taskStatus==="ממתין לאישור מחיר"
    );
  }
  get tasksByStatusInProgress() {
    return Array.from(this.jobTaskRegistry.values()).filter(
      (a, b) => a.taskStatus==="בטיפול"
    );
  }
  loadJobTasks = async () => {
    this.loadingInitial = true;
    try {
      const jobTasks = await agent.JobTasks.list();
      jobTasks.forEach((jobTask) => {
        this.setjobTask(jobTask);
      });
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  private setjobTask = (jobTask: JobTask) => {
    this.jobTaskRegistry.set(jobTask.id, jobTask);
  };
  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };
}
