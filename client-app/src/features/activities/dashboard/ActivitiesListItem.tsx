import {
  Alert,
  Badge,
  Button,
  Card,
  Image,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { ClockFill, GeoAltFill } from "react-bootstrap-icons";
import React, { SyntheticEvent, useState } from "react";

import ActivitiesListItemAttendee from "./ActivitiesListItemAttendee";
import { Activity } from "../../../app/models/activity";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { useStore } from "../../../app/stores/store";

interface Props {
  activity: Activity;
}

export default function ActivitiesListItem({ activity }: Props) {
  const [target, setTarget] = useState("");
  const { activityStore } = useStore();
  const { isLoading, deleteActivity } = activityStore;

  function handleActivityDelete(
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) {
    setTarget(event.currentTarget.name);
    deleteActivity(id);
  }

  return (
    <Card className="mb-3" key={activity.id}>
      <Card.Header>
        {activity.isCancelled && <Alert variant="danger">Cancelled</Alert>}
        <Image
          roundedCircle
          src="/assets/user.png"
          height={100}
          className="float-start my-2 mx-3"
        />
        <Link to={`/activities/${activity.id}`}>
          <Card.Title className="link-dark">{activity.title}</Card.Title>
        </Link>
        <Card.Subtitle>Hosted by {activity.host?.displayName}</Card.Subtitle>
        {activity.isHost && (
          <Badge bg="warning">You are hosting this activity</Badge>
        )}
        {!activity.isHost && activity.isGoing && (
          <Badge bg="success">You are going to this activity</Badge>
        )}
      </Card.Header>

      <Card.Body className="p-0">
        <ListGroup>
          <ListGroupItem className="py-2">
            <ClockFill className="mx-2" />
            {format(activity.date!, "dd MMM yyyy hh:mm")}
            <GeoAltFill className="mx-2" />
            {activity.city}, {activity.venue}
          </ListGroupItem>
          <ListGroupItem>
            <Card.Text>{activity.description}</Card.Text>
            <div className="float-end">
              <Link to={`/activities/${activity.id}`}>
                <Button className="mx-3" variant="primary" type="button">
                  View
                </Button>
              </Link>
              <Button
                variant="danger"
                name={activity.id}
                onClick={(e) => handleActivityDelete(e, activity.id)}
              >
                {isLoading && target === activity.id ? "Loading..." : "Delete"}
              </Button>
            </div>
          </ListGroupItem>
        </ListGroup>
      </Card.Body>
      <Card.Footer>
        <ActivitiesListItemAttendee attendees={activity.attendees!} />
        <Badge bg="secondary">{activity.category}</Badge>
      </Card.Footer>
    </Card>
  );
}
