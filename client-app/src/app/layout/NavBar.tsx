import {
  Button,
  Container,
  Image,
  Nav,
  NavDropdown,
  Navbar,
} from "react-bootstrap";
import { DoorClosedFill, PersonFill } from "react-bootstrap-icons";
import { Link, NavLink } from "react-router-dom";

import { ReactComponent as ReactLogo } from "../../logo.svg";
import { observer } from "mobx-react-lite";
import { useStore } from "../stores/store";

export default observer(function NavBar() {
  const {
    userStore: { user, logout },
  } = useStore();
  return (
    <Navbar variant="dark" className="gradient-background p-3">
      <Container>
        <Nav className="w-100">
          <Navbar.Brand as={NavLink} to="/" exact>
            <ReactLogo style={{ fill: "currentcolor" }} height="30" />{" "}
            Activities
          </Navbar.Brand>

          <Nav.Link as={NavLink} to="/activities">
            Activities
          </Nav.Link>
          <Nav.Link as={NavLink} to="/errors">
            Errors
          </Nav.Link>
          <NavLink to="/createActivity" className="me-auto">
            <Button variant="success">Create activity</Button>
          </NavLink>
          <div className="d-flex ms-auto">
            <Image
              roundedCircle
              src={user?.image || "/assets/user.png"}
              height="40"
            />
            <NavDropdown title={user?.displayName} id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to={`/profiles/${user?.username}`}>
                <PersonFill />
                Profile
              </NavDropdown.Item>
              <NavDropdown.Item onClick={logout}>
                <DoorClosedFill /> Logout
              </NavDropdown.Item>
            </NavDropdown>
          </div>
        </Nav>
      </Container>
    </Navbar>
  );
});
