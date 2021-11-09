import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Header, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponenet";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from "uuid";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { PVCTask } from "../../../app/models/pvcTask";
import { printTypeOptions } from "../../../app/common/options/printTypeOptions";
import { cornersOptions } from "../../../app/common/options/cornersOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";
import { taskStatusOptions } from "../../../app/common/options/taskStatusOptions";
import { booleanOptions } from "../../../app/common/options/booleanOptions";
import { Customer } from "../../../app/models/customer";

export default observer(function PVCForm() {
  const history = useHistory();
  const { pvcTaskStore } = useStore();
  const { createPVCTask, updatePVCTask, loading, loadPVCTask, loadingInitial } =
    pvcTaskStore;
  const { customerStore } = useStore();
  const { loadCustomers, customerRegistry, customersOptions, loadCustomer } =
    customerStore;
  const [nameCustomer, setNameCustomer] = useState<string | undefined>("");

  const { id } = useParams<{ id: string }>();
  const [pvcTask, setPVCTask] = useState<PVCTask>({
    id: "",
    widthSize: 0,
    lengthSize: 0,
    printType: "",
    corners: "",
    image: "",
    moreInfo: "",
    formatType: "PVC",
    taskType: "שילוט",
    startDate: new Date(Date.now()),
    endDate: null,
    isShipping: false,
    isPayed: false,
    isGotInvoice: false,
    taskStatus: "",
    price: 0,
    count: 0,
    customerId: "",
    cutomerName: "",
  });
  const validationSchema = Yup.object({
    customerId: Yup.string().required("חובה לבחור לקוח"),
  });

  useEffect(() => {
    if (id) loadPVCTask(id).then((pvcTask) => setPVCTask(pvcTask!));
    if (customerRegistry.size <= 1) loadCustomers();
  }, [id, loadPVCTask, customerRegistry.size, loadCustomers]);

  function handleFormSubmit(pvcTask: PVCTask) {
    if (pvcTask.customerId)
      loadCustomer(pvcTask.customerId).then(
        (customer) => handleName(customer?.customerName)
        //console.log(`customer?.customerName: ${customer?.customerName}`)

        //setNameCustomer(customer?.customerName)
      );
    //console.log(`nameCustomer: ${nameCustomer}`);
    // if (pvcTask.id.length === 0) {
    //   let newPVCTask = {
    //     ...pvcTask,
    //     id: uuid(),
    //     customerName: nameCustomer,
    //   };
    //   createPVCTask(newPVCTask).then(() => history.push(`/tasks`));
    // } else {
    //   let newPVCTask = {
    //     ...pvcTask,
    //     customerName: nameCustomer,
    //   };
    //   updatePVCTask(newPVCTask).then(() => history.push(`/tasks`));
    // }
  }
  function handleName(customerName: string | undefined) {
    setNameCustomer(customerName);
    console.log(`customerName from function: ${customerName}`);

    console.log(`nameCustomer: ${nameCustomer}`);
  }

  if (loadingInitial) return <LoadingComponent content="Loading task..." />;
  return (
    <Segment clearing center className="segmentCSS">
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={pvcTask}
        onSubmit={(values) => handleFormSubmit(values)}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <Header content="פרטי הזמנה" sub color="teal" />
            <MySelectInput
              label="לקוח"
              placeholder="לקוח"
              options={customersOptions}
              name="customerId"
            />
            <MyTextInput
              label="רוחב בסנטימטר"
              placeholder="רוחב בסנטימר"
              name="widthSize"
            />
            <MyTextInput
              label="אורך בסנטימטר"
              placeholder="אורך בסנטימר"
              name="lengthSize"
            />
            <MySelectInput
              label="סוג הדפסה"
              placeholder="סוג הדפסה"
              options={printTypeOptions}
              name="printType"
            />
            <MySelectInput
              label="גימורים (פינות)"
              placeholder="גימורים (פינות)"
              options={cornersOptions}
              name="corners"
            />
            <MyDateInput
              placeholderText="תאריך סיום רצוי"
              name="endDate"
              showTimeSelect
              timeCaption="time"
              dateFormat="MMMM d,yyyy h:mm aa"
            />
            <MySelectInput
              label="סטאטוס הזמנה"
              placeholder="סטאטוס הזמנה"
              options={taskStatusOptions}
              name="taskStatus"
            />
            <MyTextInput label="כמות" placeholder="כמות" name="count" />
            <MyTextInput label="מחיר" placeholder="מחיר" name="price" />
            <MySelectInput
              label="האם נדרש משלוח?"
              placeholder="האם נדרש משלוח?"
              options={booleanOptions}
              name="isShipping"
            />
            <MySelectInput
              label="האם שולם?"
              placeholder="האם שולם?"
              options={booleanOptions}
              name="isPayed"
            />
            <MySelectInput
              label="האם יצאה חשבונית?"
              placeholder="האם יצאה חשבונית?"
              options={booleanOptions}
              name="isGotInvoice"
            />
            <MyTextArea
              label="מידע נוסף"
              rows={3}
              placeholder="מידע נוסף"
              name="moreInfo"
            />
            <Button
              disabled={isSubmitting || !dirty || !isValid}
              loading={loading}
              floated="right"
              positive
              type="submit"
              content="שמור"
            />
            <Button
              as={Link}
              to="/tasks"
              floated="right"
              type="button"
              content="ביטול"
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
});
