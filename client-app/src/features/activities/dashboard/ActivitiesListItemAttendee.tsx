import { Image, OverlayTrigger, Popover, Stack } from "react-bootstrap";

import { Link } from "react-router-dom";
import { PeopleFill } from "react-bootstrap-icons";
import { Profile } from "../../../app/models/profile";
import React from "react";
import { observer } from "mobx-react-lite";

interface Props {
  attendees: Profile[];
}

export default observer(function ActivitiesListItemAttendee({
  attendees,
}: Props) {
  function trimDescr(descr: string | undefined) {
    if (descr) {
      return descr.length > 30 ? descr.substr(0, 30).trim() + "..." : descr;
    }
  }

  return (
    <Stack direction="horizontal" as="ul" className="list-unstyled">
      {attendees.map((attendee) => (
        <li key={attendee.username} className="me-2">
          <OverlayTrigger
            placement="auto"
            overlay={
              <Popover id={`popover-${attendee.username}`}>
                <Popover.Header as="h3">{attendee.displayName}</Popover.Header>
                <Popover.Body>
                  <Image
                    src={attendee.image || "/assets/user.png"}
                    height="200"
                    rounded
                  />
                  <p>{trimDescr(attendee.bio)}</p>
                  <p>
                    <PeopleFill height="30" className="me-2" />
                    20 followers
                  </p>
                </Popover.Body>
              </Popover>
            }
          >
            <Link to={`/profiles/${attendee.username}`}>
              <Image
                roundedCircle
                src={attendee.image || "/assets/user.png"}
                height="40"
              />
            </Link>
          </OverlayTrigger>
        </li>
      ))}
    </Stack>
  );
});
