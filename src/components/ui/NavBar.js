import React from "react";
import { Button, Navbar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const NavBar = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand>Name</Navbar.Brand>
      <Navbar.Brand className="ml-auto">
        <Button variant="outline-danger">
          <FontAwesomeIcon icon={["fas", "sign-out-alt"]} />
          <span className="ml-1">Salir</span>
        </Button>
      </Navbar.Brand>
    </Navbar>
  );
};
