import { Badge, Button, Card } from "react-bootstrap";
import React, { SyntheticEvent, useState } from "react";

import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";

function ActivityList() {
  const [target, setTarget] = useState("");
  const { activityStore } = useStore();
  const { activitiesByDate, isLoading, deleteActivity } = activityStore;

  function handleActivityDelete(
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) {
    setTarget(event.currentTarget.name);
    deleteActivity(id);
  }

  return (
    <>
      {activitiesByDate.map((item) => (
        <Card className="mb-3" key={item.id}>
          <Card.Header>
            <Card.Title>{item.title}</Card.Title>
          </Card.Header>

          <Card.Body>
            <Card.Text>{item.description}</Card.Text>
            <Card.Text>
              {item.city}, {item.venue}
            </Card.Text>
            <Button
              className="mx-3"
              variant="primary"
              as="a"
              onClick={() => activityStore.selectActivity(item.id)}
            >
              View
            </Button>
            <Button
              variant="danger"
              name={item.id}
              onClick={(e) => handleActivityDelete(e, item.id)}
            >
              {isLoading && target === item.id ? "Loading..." : "Delete"}
            </Button>
          </Card.Body>
          <Card.Footer>
            <Card.Text>{item.date}</Card.Text>
            <Badge bg="secondary">{item.category}</Badge>
          </Card.Footer>
        </Card>
      ))}
    </>
  );
}

export default observer(ActivityList);
