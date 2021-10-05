import { CalendarEventFill, GeoAltFill, InfoLg } from "react-bootstrap-icons";
import { ListGroup, ListGroupItem } from "react-bootstrap";

import { Activity } from "../../../app/models/activity";
import React from "react";

interface Props {
  activity: Activity;
}
export default function ActivityDetailedInfo({ activity }: Props) {
  return (
    <ListGroup>
      <ListGroupItem>
        <InfoLg className="me-2" />
        {activity.description}
      </ListGroupItem>
      <ListGroupItem>
        <CalendarEventFill className="me-2" />
        {activity.date}
      </ListGroupItem>
      <ListGroupItem>
        <GeoAltFill className="me-2" />
        {activity.city}, {activity.venue}
      </ListGroupItem>
    </ListGroup>
  );
}
