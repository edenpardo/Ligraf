import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import FilterList from "@material-ui/icons/FilterList";
import { useHistory } from "react-router-dom";
import InputIcon from "@material-ui/icons/Input";
import { useStore } from "../../app/stores/store";
import LoadingComponent from "../../app/layout/LoadingComponenet";
import { PlaylistAdd } from "@material-ui/icons";

const createData = (
  id: string,
  formatType: string,
  taskType: string,
  startDate: Date | null,
  endDate: Date | null,
  isShipping: boolean,
  isPayed: boolean,
  isGotInvoice: boolean,
  taskStatus: string,
  price: number,
  count: number,
  customerId: string,
  customerName: string
) => {
  return {
    id,
    formatType,
    taskType,
    startDate,
    endDate,
    isShipping,
    isPayed,
    isGotInvoice,
    taskStatus,
    price,
    count,
    customerId,
    customerName,
  };
};
type IType =
  | "string"
  | "boolean"
  | "numeric"
  | "date"
  | "datetime"
  | "time"
  | "currency";
const string: IType = "string";
const date: IType = "date";
const boolean: IType = "boolean";

const headers = [
  { title: "סוג פורמט", field: "formatType", type: string },
  { title: "סוג משימה", field: "taskType", type: string },
  {
    title: "תאריך פתיחת משימה",
    field: "startDate",
    type: date,
    dateSetting: {
      format: "dd/MM/yyyy",
    },
  },
  {
    title: "תאריך סיום משוער",
    field: "endDate",
    type: date,
    dateSetting: {
      format: "dd/MM/yyyy",
    },
  },
  { title: "האם נדרש משלוח?", field: "isShipping", type: boolean },
  { title: "האם שולם?", field: "isPayed", type: boolean },
  { title: "האם יצאה חשבונית?", field: "isGotInvoice", type: boolean },
  { title: "סטאטוס משימה", field: "taskStatus", type: string },
  { title: "מחיר", field: "price", type: string },
  { title: "שם לקוח", field: "customerName", type: string },
];

export default observer(function TasksDashboard() {
  const [filter, setFilter] = useState(false);
  const { taskStore } = useStore();
  const {
    loadJobTasks,
    jobTaskRegistry,
    tasksByStatusInProgress,
  } = taskStore;

  const data: any[] = [];
  const history = useHistory();

  const handleFilter = () => {
    setFilter(!filter);
  };
  const actions = [
    {
      icon: () => <FilterList />,
      tooltip: "Filter",
      isFreeAction: true,
      onClick: (event: any) => handleFilter(),
    },
    {
      icon: () => <PlaylistAdd />,
      tooltip: "הוספת משימה",
      isFreeAction: true,
      onClick: (event: any, data: any) => {
        history.push(`/createTask`);
      },
    },
    {
      icon: () => <InputIcon style={{ color: "#6666ff" }} />,
      tooltip: "הצג וערוך לקוח",
      position: "row",
      iconProps: { style: { color: "orange" } },
      onClick: (event: any, data: any) => {
        if (data.taskType === "PVC") {
          history.push(`/editPVCTask/${data.id}`);
        }
      },
    },
  ];

  useEffect(() => {
    if (jobTaskRegistry.size <= 1) loadJobTasks();
  }, [jobTaskRegistry.size, loadJobTasks]);

  Array.from(tasksByStatusInProgress.values()).forEach((jobTask) => {
    data.push(
      createData(
        jobTask.id,
        jobTask.formatType,
        jobTask.taskType,
        jobTask.startDate,
        jobTask.endDate,
        jobTask.isShipping,
        jobTask.isPayed,
        jobTask.isGotInvoice,
        jobTask.taskStatus,
        jobTask.price,
        jobTask.count,
        jobTask.customerId,
        jobTask.customerName
      )
    );
    console.log(data);
  });
  if (taskStore.loadingInitial)
    return <LoadingComponent content="Loading tasks" />;
  return (
    <>
      <MaterialTable
        title=""
        columns={headers}
        data={data}
        actions={actions as any}
        options={{
          exportButton: true,
          filtering: filter,
          search: true,
          //selection: true,
          sorting: true,
        }}
        localization={{
          toolbar: {
            searchTooltip: "חיפוש",
            exportTitle: "יצוא",
          },
          header: {
            actions: "",
          },
        }}
        onSelectionChange={(rows) => console.log(rows)}
      />
    </>
  );
});
