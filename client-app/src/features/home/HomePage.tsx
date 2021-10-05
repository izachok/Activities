import { Button, Container } from "react-bootstrap";

import { Link } from "react-router-dom";
import React from "react";
import { ReactComponent as ReactLogo } from "../../logo.svg";

export default function HomePage() {
  return (
    <div className="body gradient-background text-light">
      <Container className="vh-100 d-flex align-items-center justify-content-center flex-column">
        <h1>
          <ReactLogo style={{ fill: "currentcolor" }} height="80" /> Activities
        </h1>
        <h2>Welcome to Activities</h2>
        <Link to="/activities">
          <Button variant="outline-light">Take me to the activities!</Button>
        </Link>
      </Container>
    </div>
  );
}
