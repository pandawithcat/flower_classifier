import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { ImageWrapper } from "./ImageWrapper";

function Main() {
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Flower Classifier</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {/* <Nav.Link href="#home">Home</Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <ImageWrapper></ImageWrapper>
    </div>
  );
}

export default Main;
