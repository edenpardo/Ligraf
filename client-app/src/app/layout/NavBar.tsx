import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";

interface Props{
    openForm:()=>void;
}
export default function NavBar({openForm}:Props) {
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item header>
          <img
            src="/assets/logo2.png"
            alt="logo"
            style={{ marginRight: "10px", width: "3.5em" }}
          />
        </Menu.Item>
        <Menu.Item name="לקוחות" />
        <Menu.Item name="הצעות מחיר פתוחות" />
        <Menu.Item name="משימות בטיפול" />
        <Menu.Item name="עבודות לאיסוף" />
        <Menu.Item name="היסטוריית עבודות" />
        <Menu.Item name="מלאי" />
        <Menu.Item>
          <Button
          onClick={openForm}
            positive
            content="יצירת משימה"
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
}
