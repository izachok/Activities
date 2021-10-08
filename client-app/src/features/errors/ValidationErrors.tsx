import { Card, Container } from "react-bootstrap";

import React from "react";

interface Props {
  errors: any;
}

export default function ValidationErrors({ errors }: Props) {
  return (
    <Container>
      <Card className="mt-3 p-3">
        {errors && (
          <ul className="text-danger">
            {errors.map((err: any, index: any) => (
              <li key={index}>{err}</li>
            ))}
          </ul>
        )}
      </Card>
    </Container>
  );
}
