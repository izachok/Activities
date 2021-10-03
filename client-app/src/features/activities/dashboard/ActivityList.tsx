import { Badge, Button, Card } from "react-bootstrap";
import React, { SyntheticEvent, useState } from "react";

import { Activity } from "../../../app/models/activity";

interface Props {
  activities: Activity[];
  selectActivity: (id: string) => void;
  deleteActivity: (id: string) => void;
  isSubmitting: boolean;
}
export default function ActivityList({
  activities,
  selectActivity,
  deleteActivity,
  isSubmitting,
}: Props) {
  const [target, setTarget] = useState("");

  function handleActivityDelete(
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) {
    setTarget(event.currentTarget.name);
    deleteActivity(id);
  }

  return (
    <>
      {activities.map((item) => (
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
              onClick={() => selectActivity(item.id)}
            >
              View
            </Button>
            <Button
              variant="danger"
              name={item.id}
              onClick={(e) => handleActivityDelete(e, item.id)}
            >
              {isSubmitting && target === item.id ? "Loading..." : "Delete"}
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
