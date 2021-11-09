import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Header, Segment } from "semantic-ui-react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { signsOptions } from "../../../app/common/options/signsOptions";

export default observer(function CreateFormSigns() {
  const history = useHistory();
  const [task, setTask] = useState({
    formatType: "שילוט",
    taskType: "",
  });
  const validationSchema = Yup.object({
    taskType: Yup.string().required("חובה לבחור סוג פורמט"),
  });

  useEffect(() => {
  }, [task]);

  function handleFormSubmit(task: any) {
    if (task.taskType === "PVC") history.push(`/createPVCTask`);
  }

  return (
    <Segment clearing center className="segmentCSS">
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={task}
        onSubmit={(values) => handleFormSubmit(values)}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <Header content="אנא בחר את סוג המשימה" sub color="teal" />
            <MySelectInput
              label="סוג משימה"
              placeholder="סוג משימה"
              options={signsOptions}
              name="taskType"
            />
            <Button
              disabled={isSubmitting}
              floated="right"
              positive
              type="submit"
              content="המשך"
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
