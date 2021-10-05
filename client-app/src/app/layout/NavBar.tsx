import { Button, Container, Nav, Navbar } from "react-bootstrap";

import { NavLink } from "react-router-dom";
import { ReactComponent as ReactLogo } from "../../logo.svg";

export default function NavBar() {
  return (
    <Navbar variant="dark" className="gradient-background p-3">
      <Container>
        <Navbar.Brand as={NavLink} to="/" exact>
          <ReactLogo style={{ fill: "currentcolor" }} height="30" /> Activities
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
