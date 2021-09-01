import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import LoadingComponent from "../../../app/layout/LoadingComponenet";
import { useStore } from "../../../app/stores/store";
import MaterialTable from "material-table";
import FilterList from "@material-ui/icons/FilterList";
import { useHistory } from "react-router-dom";
import InputIcon from "@material-ui/icons/Input";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

const createData = (
  id: string,
  company: string,
  mainEmail: string,
  mainPhoneNumber: string,
  address: string,
  hp: string,
  customerName: string,
  customerType: string,
  bookkeepingName: string,
  bookkeepingEmail: string,
  bookkeepingPhoneNumber: string,
  moreInfo: string
) => {
  return {
    id,
    company,
    mainEmail,
    mainPhoneNumber,
    address,
    hp,
    customerName,
    customerType,
    bookkeepingName,
    bookkeepingEmail,
    bookkeepingPhoneNumber,
    moreInfo,
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

const headers = [
  { title: "שם חברה", field: "company", type: string },
  { title: "שם לקוח", field: "customerName", type: string },
  { title: "מייל", field: "mainEmail", type: string },
  { title: "מספר פלאפון", field: "mainPhoneNumber", type: string },
  { title: "כתובת", field: "address", type: string },
  { title: "חפ", field: "hp", type: string },
  { title: "סוג לקוח", field: "customerType", type: string },
  // { title: "שם הנהלת חשבונות", field: "bookkeepingName", type: string },
  // { title: "אימייל הנהלת חשבונות", field: "bookkeepingEmail", type: string },
  // { title: "טלפון הנהלת חשבונות", field: "bookkeepingName", type: string },
  // { title: "מידע נוסף", field: "moreInfo", type: string },
];

export default observer(function CustomersDashboard() {
  const [filter, setFilter] = useState(false);

  const { customerStore } = useStore();
  const { loadCustomers, customerRegistry } = customerStore;
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
      icon: () => <PersonAddIcon />,
      tooltip: "הוספת לקוח",
      isFreeAction: true,
      onClick: (event: any, data: any) => {
        history.push(`/createCustomer`);
      },
    },
    {
      icon: () => <InputIcon style={{ color: "#6666ff" }} />,
      tooltip: "הצג וערוך לקוח",
      position: "row",
      iconProps: { style: { color: "orange" } },
      onClick: (event: any, data: any) => {
        history.push(`/editCustomer/${data.id}`);
      },
    },
  ];
  useEffect(() => {
    if (customerRegistry.size <= 1) loadCustomers();
  }, [customerRegistry.size, loadCustomers]);

  Array.from(customerRegistry.values()).forEach((customer) => {
    data.push(
      createData(
        customer.id,
        customer.company,
        customer.mainEmail,
        customer.mainPhoneNumber,
        customer.address,
        customer.hp,
        customer.customerName,
        customer.customerType,
        customer.bookkeepingName,
        customer.bookkeepingEmail,
        customer.bookkeepingPhoneNumber,
        customer.moreInfo
      )
    );
    //console.log(data);
  });

  if (customerStore.loadingInitial)
    return <LoadingComponent content="Loading customers" />;

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
