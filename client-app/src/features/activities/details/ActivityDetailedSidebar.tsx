import { Badge, Image, ListGroup, ListGroupItem } from "react-bootstrap";

import { Activity } from "../../../app/models/activity";
import { Link } from "react-router-dom";
import React from "react";
import { observer } from "mobx-react-lite";

interface Props {
  activity: Activity;
}

export default observer(function ActivityDetailedSidebar({
  activity: { attendees, host },
}: Props) {
  if (!attendees) return null;

  return (
    <ListGroup>
      <ListGroupItem active>
        {attendees.length} {attendees.length === 1 ? "Person" : "People"} going
      </ListGroupItem>

      {attendees.map((attendee) => (
        <ListGroupItem key={attendee.username} className="p-3">
          <Image
            src={attendee.image || "/assets/user.png"}
            height="60"
            className="float-start me-2"
            alt={attendee.username}
          />
          <h5>
            <Link to={`/profiles/${attendee.username}`}>
              {attendee.displayName}
            </Link>{" "}
            {attendee.username === host?.username && (
              <Badge bg="warning" className="float-end">
                Host
              </Badge>
            )}
          </h5>
          <div className="text-warning">Following</div>
        </ListGroupItem>
      ))}
    </ListGroup>
  );
});
