import { Image, Stack } from "react-bootstrap";

import { Link } from "react-router-dom";
import Popover from "../../../app/common/popover/Popover";
import { Profile } from "../../../app/models/profile";
import ProfileCard from "../../profiles/ProfileCard";
import React from "react";
import { observer } from "mobx-react-lite";

interface Props {
  attendees: Profile[];
}

export default observer(function ActivitiesListItemAttendee({
  attendees,
}: Props) {
  return (
    <Stack direction="horizontal" as="ul" className="list-unstyled">
      {attendees.map((attendee) => (
        <li key={attendee.username} className="me-2">
          <Popover
            mainComponent={
              <Link to={`/profiles/${attendee.username}`}>
                <Image
                  roundedCircle
                  src={attendee.image || "/assets/user.png"}
                  height="40"
                  className={
                    attendee.isFollowing ? "border border-2 border-warning" : ""
                  }
                />
              </Link>
            }
            popoverComponent={<ProfileCard profile={attendee} />}
          />
        </li>
      ))}
    </Stack>
  );
});
