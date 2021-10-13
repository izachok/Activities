import { Button, ButtonGroup, Card, Col, Row } from "react-bootstrap";
import { ImageFill, TrashFill } from "react-bootstrap-icons";
import React, { SyntheticEvent, useState } from "react";

import { Photo } from "./../../app/models/profile";
import PhotoUploadWidget from "../../app/common/imageUpload/PhotoUploadWidget";
import { Profile } from "../../app/models/profile";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";

interface Props {
  profile: Profile;
}

export default observer(function ProfilePhotos({ profile }: Props) {
  const { profileStore } = useStore();

  const [addPhotoMode, setAddPhotoMode] = useState(false);
  const [target, setTarget] = useState("");

  function handlePhotoUpload(file: Blob) {
    profileStore.uploadPhoto(file).then(() => setAddPhotoMode(false));
  }

  function handleSetMainPhoto(
    photo: Photo,
    e: SyntheticEvent<HTMLButtonElement>
  ) {
    setTarget(e.currentTarget.name);
    profileStore.setMainPhoto(photo);
  }

  function handleDeletePhoto(
    photo: Photo,
    e: SyntheticEvent<HTMLButtonElement>
  ) {
    setTarget(e.currentTarget.name);
    profileStore.deletePhoto(photo);
  }

  return (
    <>
      <h4 className="mb-4">
        <ImageFill /> Photos
        {profileStore.isCurrentUser && (
          <Button
            variant="outline-secondary"
            className="float-end"
            onClick={() => setAddPhotoMode(!addPhotoMode)}
          >
            {addPhotoMode ? "Cancel" : "Add Photo"}
          </Button>
        )}
      </h4>
      {profileStore.isCurrentUser && addPhotoMode ? (
        <PhotoUploadWidget
          loading={profileStore.isUploading}
          uploadPhoto={handlePhotoUpload}
        />
      ) : (
        <Row xs={4}>
          {profile.photos?.map((photo) => (
            <Col key={photo.id}>
              <Card className="m-2">
                <Card.Img variant="top" src={photo.url} />
                {profileStore.isCurrentUser && (
                  <ButtonGroup className="w-100">
                    <Button
                      variant="outline-success"
                      name={"main" + photo.id}
                      disabled={photo.isMain}
                      onClick={(e) => handleSetMainPhoto(photo, e)}
                    >
                      {profileStore.isLoading && target === "main" + photo.id
                        ? "Loading..."
                        : "Main"}
                    </Button>
                    <Button
                      variant="outline-danger"
                      onClick={(e) => handleDeletePhoto(photo, e)}
                      name={photo.id}
                      disabled={
                        photo.isMain ||
                        (profileStore.isLoading && target === photo.id)
                      }
                    >
                      {profileStore.isLoading && target === photo.id ? (
                        "Deleting..."
                      ) : (
                        <TrashFill />
                      )}
                    </Button>
                  </ButtonGroup>
                )}
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </>
  );
});
