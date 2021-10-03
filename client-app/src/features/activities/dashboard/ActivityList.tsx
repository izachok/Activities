import { Badge, Button, Card } from "react-bootstrap";

import { Activity } from "../../../app/models/activity";
import React from "react";

interface Props {
  activities: Activity[];
  selectActivity: (id: string) => void;
  deleteActivity: (id: string) => void;
}
export default function ActivityList({
  activities,
  selectActivity,
  deleteActivity,
}: Props) {
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
            <Button variant="danger" onClick={() => deleteActivity(item.id)}>
              Delete
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
