import React, { useState } from "react";

import { Button } from "react-bootstrap";
import { PersonFill } from "react-bootstrap-icons";
import { Profile } from "../../app/models/profile";
import ProfileForm from "./ProfileForm";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";

interface Props {
  profile: Profile;
}

export default observer(function ProfileAbout({ profile }: Props) {
  const { profileStore } = useStore();
  const [editMode, setEditMode] = useState(false);

  return (
    <>
      <h4 className="mb-4">
        <PersonFill /> About {profile.displayName}
        {profileStore.isCurrentUser && (
          <Button
            variant="outline-secondary"
            className="float-end"
            onClick={() => setEditMode(!editMode)}
          >
            {editMode ? "Cancel" : "Edit Profile"}
          </Button>
        )}
      </h4>
      {editMode ? (
        <ProfileForm profile={profile} onFinish={() => setEditMode(false)} />
      ) : (
        <div style={{ whiteSpace: "pre-wrap" }}>{profile.bio}</div>
      )}
    </>
  );
});
