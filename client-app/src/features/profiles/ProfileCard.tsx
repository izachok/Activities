import { Card, Image } from "react-bootstrap";

import FollowButton from "./FollowButton";
import { Link } from "react-router-dom";
import { PeopleFill } from "react-bootstrap-icons";
import { Profile } from "../../app/models/profile";
import React from "react";
import { observer } from "mobx-react-lite";

interface Props {
  profile: Profile;
}

export default observer(function ProfileCard({ profile }: Props) {
  function trimDescr(descr: string | undefined) {
    if (descr) {
      return descr.length > 28 ? descr.substr(0, 25).trim() + "..." : descr;
    }
  }

  return (
    <Card style={{ maxWidth: "300px" }}>
      <Card.Header as="h3">
        <Link to={`/profiles/${profile.username}`}>{profile.displayName}</Link>
      </Card.Header>
      <Card.Body>
        <Image
          src={profile.image || "/assets/user.png"}
          className="w-100"
          rounded
        />
        <p>{trimDescr(profile.bio)}</p>
        <FollowButton profile={profile} />
        <p>
          <PeopleFill height="30" className="me-2" />
          {profile.followersCount} followers
        </p>
      </Card.Body>
    </Card>
  );
});
