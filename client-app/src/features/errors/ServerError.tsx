import { Card, Container } from "react-bootstrap";

import React from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";

function ServerError() {
  const { commonStore } = useStore();

  return (
    <Container>
      <h2>Server Error</h2>
      <p className="h5 text-danger">{commonStore.error?.message}</p>
      {commonStore.error?.details && (
        <Card>
          <Card.Header>Stack trace</Card.Header>
          <Card.Body>
            <code>{commonStore.error.details}</code>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
}

export default observer(ServerError);
