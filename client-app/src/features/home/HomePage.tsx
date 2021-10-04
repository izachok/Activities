import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import React from "react";

export default function HomePage() {
  return (
    <Container className="py-5">
      <h1>Home page</h1>
      <h2>
        Go to <Link to="/activities">Activities</Link>
      </h2>
    </Container>
  );
}
