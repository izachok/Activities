import { Button, ButtonGroup, Card } from "react-bootstrap";
import React, { useEffect } from "react";

import LoadingComponent from "./../../../app/layout/LoadingComponent";
import { NavLink } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router";
import { useStore } from "./../../../app/stores/store";

function ActivityDetails() {
  const { id } = useParams<{ id: string }>();
  const { activityStore } = useStore();
  const { selectedActivity, loadActivity, isInitialLoading } = activityStore;

  useEffect(() => {
    if (id) loadActivity(id);
  }, [id, loadActivity]);

  if (isInitialLoading || !selectedActivity) return <LoadingComponent />;

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
          <NavLink to={`/manage/${selectedActivity.id}`}>
            <Button variant="outline-primary">Edit</Button>
          </NavLink>
          <NavLink to="/activities">
            <Button variant="outline-secondary">Cancel</Button>
          </NavLink>
        </ButtonGroup>
      </Card.Body>
    </Card>
  );
}

export default observer(ActivityDetails);
