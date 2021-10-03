import { Button, ButtonGroup, Card } from "react-bootstrap";

import { Activity } from "./../../../app/models/activity";
import React from "react";

interface Props {
  activity: Activity;
  cancelSelectActivity: () => void;
  openForm: (id?: string) => void;
}

export default function ActivityDetails({
  activity,
  cancelSelectActivity,
  openForm,
}: Props) {
  return (
    <Card className="mb-3">
      <Card.Img
        variant="top"
        src={`/assets/categoryImages/${activity.category}.jpg`}
      />
      <Card.Body>
        <Card.Title>{activity.title}</Card.Title>
        <Card.Subtitle>{activity.date}</Card.Subtitle>
        <Card.Text>{activity.description}</Card.Text>
        <ButtonGroup className="container-fluid">
          <Button
            variant="outline-primary"
            onClick={() => openForm(activity.id)}
          >
            Edit
          </Button>
          <Button variant="outline-secondary" onClick={cancelSelectActivity}>
            Cancel
          </Button>
        </ButtonGroup>
      </Card.Body>
    </Card>
  );
}
