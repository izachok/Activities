import { Button, ButtonGroup, Card } from "react-bootstrap";

import React from "react";
import { useStore } from "./../../../app/stores/store";

export default function ActivityDetails() {
  const { activityStore } = useStore();
  const { selectedActivity } = activityStore;

  if (!selectedActivity) return <></>;

  return (
    <Card className="mb-3">
      <Card.Img
        variant="top"
        src={`/assets/categoryImages/${selectedActivity.category}.jpg`}
      />
      <Card.Body>
        <Card.Title>{selectedActivity.title}</Card.Title>
        <Card.Subtitle>{selectedActivity.date}</Card.Subtitle>
        <Card.Text>{selectedActivity.description}</Card.Text>
        <ButtonGroup className="container-fluid">
          <Button
            variant="outline-primary"
            onClick={() => activityStore.openForm(selectedActivity.id)}
          >
            Edit
          </Button>
          <Button
            variant="outline-secondary"
            onClick={activityStore.cancelSelectedActivity}
          >
            Cancel
          </Button>
        </ButtonGroup>
      </Card.Body>
    </Card>
  );
}
