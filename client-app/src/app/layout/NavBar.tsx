import { Button, Container, Nav, Navbar } from "react-bootstrap";

import { useStore } from "./../stores/store";

export default function NavBar() {
  const { activityStore } = useStore();

  return (
    <Navbar bg="info" variant="light" className="p-3">
      <Container>
        <Navbar.Brand href="#">
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
          <Nav.Link href="#">Activities</Nav.Link>
          <Button variant="success" onClick={() => activityStore.openForm()}>
            Create activity
          </Button>
        </Nav>
      </Container>
    </Navbar>
  );
}
