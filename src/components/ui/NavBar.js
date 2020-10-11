import React from "react";
import { Button, Navbar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../../actions/auth";

export const NavBar = () => {
  const { name } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const hablerLogout = () => {
    dispatch(startLogout());
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand>{name}</Navbar.Brand>
      <Navbar.Brand className="ml-auto">
        <Button variant="outline-danger" onClick={hablerLogout}>
          <FontAwesomeIcon icon={["fas", "sign-out-alt"]} />
          <span className="ml-1">Salir</span>
        </Button>
      </Navbar.Brand>
    </Navbar>
  );
};
