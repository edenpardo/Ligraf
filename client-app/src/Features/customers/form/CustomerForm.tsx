import { observer } from "mobx-react-lite";
import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import { useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, DropdownItem, Form, Segment, Select } from "semantic-ui-react";
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
  
  const customerTypeOptions = [
    { key: 'P', text: 'פרטי', value: 'פרטי' },
    { key: 'B', text: 'עסק', value: 'עסק' },
    { key: 'I', text: 'מוסד', value: 'עסק' },
    { key: 'D', text: 'דילר', value: 'דילר' },
    { key: 'O', text: 'אחר', value: 'אחר' },
  ]
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

  useEffect(() => {
    if (id) loadCustomer(id).then((customer) => setCustomer(customer!));
  }, [id, loadCustomer]);

  function handleSubmit() {
    if (customer.id.length === 0) {
      let newCustomer = {
        ...customer,
        id: uuid(),
      };
      createCustomer(newCustomer).then(() =>
        history.push(`/customers`)
      );
    } else {
      updateCustomer(customer).then(() =>
        history.push(`/customers`)
      );
    }
  }
  function handleInputChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const selected_box =  event.target;
    console.log(selected_box);
    const { name, value } = event.target;
    console.log(name);
    setCustomer({ ...customer, [name]: value });
  }

  function handleSelectChange (event: SyntheticEvent<HTMLElement>,data: any) {
    const { name, value } = data;
    console.log(name);
    console.log(value);
    setCustomer({ ...customer, [name]: value });
  };

  if (loadingInitial) return <LoadingComponent content="Loading customer..." />;

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Form.Group widths="equal">
          <Form.Input
            label="חברה"
            placeholder="חברה"
            value={customer.company}
            name="company"
            onChange={handleInputChange}
          />
          <Form.Input
            label="שם לקוח"
            placeholder="שם לקוח"
            value={customer.customerName}
            name="customerName"
            onChange={handleInputChange}
          />
          <Form.Input
            label="מייל ראשי"
            placeholder="מייל ראשי"
            value={customer.mainEmail}
            name="mainEmail"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input
            label="מספר פלאפון ראשי"
            placeholder="מספר פלאפון ראשי"
            value={customer.mainPhoneNumber}
            name="mainPhoneNumber"
            onChange={handleInputChange}
          />
          <Form.Input
            label="כתובת"
            placeholder="כתובת"
            value={customer.address}
            name="address"
            onChange={handleInputChange}
          />
          <Form.Input
            label="חפ"
            placeholder="חפ"
            value={customer.hp}
            name="hp"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Select
          id="select_id"
          width={5}
          options={customerTypeOptions}
          label="סוג לקוח"
          placeholder="סוג לקוח"
          value={customer.customerType}
          name="customerType"
          onChange={handleSelectChange}
        />
        <Form.Group widths="equal">
          <Form.Input
            label="הנהלת חשבונות-שם לקוח"
            placeholder="הנהלת חשבונות-שם לקוח"
            value={customer.bookkeepingName}
            name="bookkeepingName"
            onChange={handleInputChange}
          />
          <Form.Input
            label="הנהלת חשבונות-מייל"
            placeholder="הנהלת חשבונות-מייל"
            value={customer.bookkeepingEmail}
            name="bookkeepingEmail"
            onChange={handleInputChange}
          />
          <Form.Input
            label="הנהלת חשבונות-מספר פלאפון"
            placeholder="הנהלת חשבונות-מספר פלאפון"
            value={customer.bookkeepingPhoneNumber}
            name="bookkeepingPhoneNumber"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.TextArea
          label="מידע נוסף"
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
    </Segment>
  );
});
