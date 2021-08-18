import React from "react";
import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import { observer } from "mobx-react-lite";
import { Route, useLocation } from "react-router-dom";
import HomePage from "../../Features/home/HomePage";
import ActivityForm from "../../Features/activities/form/ActivityForm";
import ActivityDashboard from "../../Features/activities/dashboard/ActivityDashboard";
import ActivityDetails from "../../Features/activities/details/ActivityDetails";
import CustomersDashboard from "../../Features/customers/dashboard/CustomersDashboard";
import PriceOffersDashboard from "../../Features/priceOffers/dashboard/PriceOffersDashboard";
import TasksDashboard from "../../Features/tasks/TasksDashboard";
import finishedTasksDashboard from "../../Features/finishedTasks/finishedTasksDashboard";
import TasksHistoryDashboard from "../../Features/tasksHistory/TasksHistoryDashboard";
import stockDashboard from "../../Features/stock/stockDashboard";
import CustomerForm from "../../Features/customers/form/CustomerForm";

function App() {
  const location = useLocation();
  return (
    <>
      <Route exact path="/" component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <>
            <NavBar />
            <Container style={{ marginTop: "7em" }}>
              <Route exact path="/activities" component={ActivityDashboard} />
              <Route path="/activities/:id" component={ActivityDetails} />
              <Route
                key={location.key}
                path={["/createActivity", "/manage/:id"]}
                component={ActivityForm}
              />
              <Route path="/customers" component={CustomersDashboard} />
              <Route path="/priceoffers" component={PriceOffersDashboard} />
              <Route path="/tasks" component={TasksDashboard} />
              <Route path="/finishedtasks" component={finishedTasksDashboard} />
              <Route path="/taskshistory" component={TasksHistoryDashboard} />
              <Route path="/stock" component={stockDashboard} />
              <Route
                key={location.key}
                path={["/createCustomer", "/editCustomer/:id"]}
                component={CustomerForm}
              />
            </Container>
          </>
        )}
      />
    </>
  );
}

export default observer(App);
