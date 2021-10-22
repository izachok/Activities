import { Card, Col, Row } from "react-bootstrap";

import { Link } from "react-router-dom";
import LoadingComponent from "./../../app/layout/LoadingComponent";
import React from "react";
import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";

export default observer(function ProfileActivitiesList() {
  const { profileStore } = useStore();
  const { activities, isLoadingActivities } = profileStore;

  return (
    <Row xs={3}>
      {isLoadingActivities ? (
        <LoadingComponent className="w-100 h-100" />
      ) : (
        activities.map((activity) => (
          <Col key={activity.id}>
            <Link to={`/activities/${activity.id}`} className="text-body">
              <Card>
                <Card.Img
                  variant="top"
                  src={`/assets/categoryImages/${activity.category}.jpg`}
                />
                <Card.Body className="text-center">
                  <Card.Title>{activity.title}</Card.Title>
                  <Card.Text>
                    {format(new Date(activity.date), "do MMM")}
                    <br />
                    {format(new Date(activity.date), "h:mm")}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))
      )}
    </Row>
  );
});
