import { Col, Container, ListGroup, Row } from "react-bootstrap";

import { Activity } from "../../../app/models/activity";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";
import React from "react";

interface Props {
  activities: Activity[];
  selectedActivity: Activity | undefined;
  selectActivity: (id: string) => void;
  cancelSelectActivity: () => void;
  editMode: boolean;
  openForm: (id?: string) => void;
  closeForm: () => void;
  createOrEdit: (activity: Activity) => void;
  deleteActivity: (id: string) => void;
  isSubmitting: boolean;
}

export default function ActivityDashboard({
  activities,
  selectActivity,
  selectedActivity,
  cancelSelectActivity,
  editMode,
  openForm,
  closeForm,
  createOrEdit,
  deleteActivity,
  isSubmitting,
}: Props) {
  return (
    <Container className="py-4">
      <Row>
        <Col sm={8}>
          <ListGroup>
            <ActivityList
              activities={activities}
              selectActivity={selectActivity}
              deleteActivity={deleteActivity}
              isSubmitting={isSubmitting}
            />
          </ListGroup>
        </Col>
        <Col sm={4}>
          {selectedActivity && !editMode && (
            <ActivityDetails
              activity={selectedActivity}
              cancelSelectActivity={cancelSelectActivity}
              openForm={openForm}
            />
          )}
          {editMode && (
            <ActivityForm
              activity={selectedActivity}
              closeForm={closeForm}
              createOrEdit={createOrEdit}
              isSubmitting={isSubmitting}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
}
