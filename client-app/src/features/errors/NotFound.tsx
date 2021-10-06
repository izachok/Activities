import { Button, Card, Container } from "react-bootstrap";

import { Link } from "react-router-dom";
import React from "react";
import { Search } from "react-bootstrap-icons";

export default function NotFound() {
  return (
    <Container className="mt-4 text-center">
      <Card className="py-4">
        <Card.Body>
          <div className="h4">
            <Search height="30" className="me-2" />
            Oops, we couldn't found this
          </div>
          <Link to="/activities">
            <Button>Return to activities page</Button>
          </Link>
        </Card.Body>
      </Card>
    </Container>
  );
}
