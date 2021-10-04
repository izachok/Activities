import { Button, Container, Nav, Navbar } from "react-bootstrap";

import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <Navbar bg="info" variant="light" className="p-3">
      <Container>
        <Navbar.Brand as={NavLink} to="/" exact>
          <img
            src="/assets/logo.svg"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="Activities logo"
          />{" "}
          Activities
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={NavLink} to="/activities">
            Activities
          </Nav.Link>
          <NavLink to="/createActivity">
            <Button variant="success">Create activity</Button>
          </NavLink>
        </Nav>
      </Container>
    </Navbar>
  );
}
