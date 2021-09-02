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
import { customerTypeOptions } from "../../../app/common/options/customerTypeOptions";
import { Customer } from "../../../app/models/customer";

export default observer(function CustomerForm() {
  const history = useHistory();
  const { customerStore } = useStore();
  const {
    createCustomer,
    updateCustomer,
    loading,
    loadCustomer,
    loadingInitial,
  } = customerStore;

  const { id } = useParams<{ id: string }>();
  const [customer, setCustomer] = useState({
    id: "",
    company: "",
    mainEmail: "",
    mainPhoneNumber: "",
    address: "",
    hp: "",
    customerName: "",
    customerType: "אחר",
    bookkeepingName: "",
    bookkeepingEmail: "",
    bookkeepingPhoneNumber: "",
    moreInfo: "",
  });
  const validationSchema = Yup.object({
    mainEmail: Yup.string()
      .email("כתובת מייל אינה חוקית")
      .required("נא להכניס את המייל הראשי של הלקוח"),
    mainPhoneNumber: Yup.string().required(
      "נא להכניס את מספר הפלאפון של הלקוח"
    ),
    customerName: Yup.string().required("נא להכניס את שמו של הלקוח"),
  });

  useEffect(() => {
    if (id) loadCustomer(id).then((customer) => setCustomer(customer!));
  }, [id, loadCustomer]);

  function handleFormSubmit(customer: Customer) {
    if (customer.id.length === 0) {
      let newCustomer = {
        ...customer,
        id: uuid(),
      };
      createCustomer(newCustomer).then(() => history.push(`/customers`));
    } else {
      updateCustomer(customer).then(() => history.push(`/customers`));
    }
  }

  if (loadingInitial) return <LoadingComponent content="Loading customer..." />;

  return (
    <Segment clearing>
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={customer}
        onSubmit={(values) => handleFormSubmit(values)}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <Header content="פרטי הלקוח" sub color="teal" />
            <MyTextInput label="חברה" placeholder="חברה" name="company" />
            <MyTextInput
              label="שם לקוח"
              placeholder="שם לקוח"
              name="customerName"
            />
            <MyTextInput
              label="מייל ראשי"
              placeholder="מייל ראשי"
              name="mainEmail"
            />
            <MyTextInput
              label="מספר פלאפון ראשי"
              placeholder="מספר פלאפון ראשי"
              name="mainPhoneNumber"
            />
            <MyTextInput label="כתובת" placeholder="כתובת" name="address" />
            <MyTextInput label="חפ" placeholder="חפ" name="hp" />
            <MySelectInput
              label="סוג לקוח"
              options={customerTypeOptions}
              placeholder="סוג לקוח"
              name="customerType"
            />
            <Header content="פרטי הלקוח- הנהלת חשבונות" sub color="teal" />
            <MyTextInput
              label="הנהלת חשבונות-שם לקוח"
              placeholder="הנהלת חשבונות-שם לקוח"
              name="bookkeepingName"
            />
            <MyTextInput
              label="הנהלת חשבונות-מייל"
              placeholder="הנהלת חשבונות-מייל"
              name="bookkeepingEmail"
            />
            <MyTextInput
              label="הנהלת חשבונות-מספר פלאפון"
              placeholder="הנהלת חשבונות-מספר פלאפון"
              name="bookkeepingPhoneNumber"
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
              to="/customers"
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
