import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useState } from "react";
import { useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Form, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponenet";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from "uuid";

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
    customerRank: "",
    bookkeepingName: "",
    bookkeepingEmail: "",
    bookkeepingPhoneNumber: "",
    moreInfo: "",
  });

  useEffect(() => {
    if (id) loadCustomer(id).then((customer) => setCustomer(customer!));
  }, [id, loadCustomer]);

  function handleSubmit() {
    if(customer.id.length===0){
      let newCustomer={
        ...customer,
        id:uuid()
      }
      createCustomer(newCustomer).then(()=> history.push(`/customers/${newCustomer.id}`));
    }  else{
      updateCustomer(customer).then(()=> history.push(`/customers/${customer.id}`));
    }
  }
  function handleInputChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setCustomer({ ...customer, [name]: value });
  }

  if (loadingInitial) return <LoadingComponent content="Loading customer..." />;

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Form.Input
          placeholder="חברה"
          value={customer.company}
          name="company"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="מייל ראשי"
          value={customer.mainEmail}
          name="mainEmail"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="מספר פלאפון ראשי"
          value={customer.mainPhoneNumber}
          name="mainPhoneNumber"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="כתובת"
          value={customer.address}
          name="address"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="חפ"
          value={customer.hp}
          name="hp"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="שם לקוח"
          value={customer.customerName}
          name="customerName"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="דירוג לקוח"
          value={customer.customerRank}
          name="customerRank"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="הנהלת חשבונות-שם לקוח"
          value={customer.bookkeepingName}
          name="bookkeepingName"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="הנהלת חשבונות-מייל"
          value={customer.bookkeepingEmail}
          name="bookkeepingEmail"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="הנהלת חשבונות-מספר פלאפון"
          value={customer.bookkeepingPhoneNumber}
          name="bookkeepingPhoneNumber"
          onChange={handleInputChange}
        />
        <Form.TextArea
          placeholder="מידע נוסף"
          value={customer.moreInfo}
          name="moreInfo"
          onChange={handleInputChange}
        />
        <Button
          loading={loading}
          floated="right"
          positive
          type="submit"
          content="הוספה"
        />
        <Button as={Link} to='/customers' floated="right" type="button" content="ביטול" />
      </Form>
    </Segment>
  );
});
