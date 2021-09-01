import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Container, Menu } from "semantic-ui-react";

export default function NavBar() {
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item as={NavLink} to='/' exact header>
          <img
            src="/assets/logo2.png"
            alt="logo"
            style={{ marginRight: "10px", width: "3.5em" }}
          />
        </Menu.Item>
        <Menu.Item as={NavLink} to='/activities' name="Activities" />
        <Menu.Item as={NavLink} to='/errors' name="Errors" />
        <Menu.Item as={NavLink} to='/customers' name="לקוחות" />
        <Menu.Item as={NavLink} to='/priceoffers' name="הצעות מחיר פתוחות" />
        <Menu.Item as={NavLink} to='/tasks' name="משימות בטיפול" />
        <Menu.Item as={NavLink} to='/finishedtasks' name="עבודות לאיסוף" />
        <Menu.Item as={NavLink} to='/taskshistory' name="היסטוריית עבודות" />
        <Menu.Item as={NavLink} to='/stock' name="מלאי" />
        <Menu.Item>
          <Button
            as={NavLink} to='/createActivity'
            positive
            content="יצירת משימה"
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
}
