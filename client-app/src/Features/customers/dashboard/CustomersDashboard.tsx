import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import LoadingComponent from "../../../app/layout/LoadingComponenet";
import { useStore } from "../../../app/stores/store";
import { Table, Button, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import MaterialTable from "material-table";

const createData = (
  id: string,
  company: string,
  mainEmail: string,
  mainPhoneNumber: string,
  address: string,
  hp: string,
  customerName: string,
  customerRank: string,
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
    customerRank,
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
  { title: "דירוג לקוח", field: "customerRank", type: string },
  // { title: "שם הנהלת חשבונות", field: "bookkeepingName", type: string },
  // { title: "אימייל הנהלת חשבונות", field: "bookkeepingEmail", type: string },
  // { title: "טלפון הנהלת חשבונות", field: "bookkeepingName", type: string },
  // { title: "מידע נוסף", field: "moreInfo", type: string },
];

export default observer(function CustomersDashboard() {
  const { customerStore } = useStore();
  const { loadCustomers, customerRegistry } = customerStore;
  const data: any[] = [];

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
        customer.customerRank,
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
        title="לקוחות" 
        columns={headers}
        data={data}
      />
    </>
  );
});
