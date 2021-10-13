import * as Yup from "yup";

import { Form, Formik } from "formik";

import { Button } from "react-bootstrap";
import { Profile } from "../../app/models/profile";
import React from "react";
import TextArea from "../../app/common/form/TextArea";
import TextInput from "../../app/common/form/TextInput";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";

interface Props {
  profile: Profile;
  onFinish: () => void;
}

export default observer(function ProfileForm({ profile, onFinish }: Props) {
  const { profileStore } = useStore();

  const initialProfile = {
    displayName: profile.displayName,
    bio: profile.bio,
  };

  function handleFormSubmit(values: Partial<Profile>) {
    profileStore.updateProfile(values as Profile).then(() => onFinish());
  }

  return (
    <>
      <Formik
        initialValues={initialProfile}
        enableReinitialize
        onSubmit={handleFormSubmit}
        validationSchema={Yup.object({
          displayName: Yup.string().required("Display name is required field"),
        })}
      >
        {({ handleSubmit, dirty, isSubmitting, isValid }) => (
          <Form onSubmit={handleSubmit} autoComplete="off">
            <TextInput placeholder="Display name" name="displayName" />
            <TextArea placeholder="Bio" name="bio" />

            <br />
            <div className="float-end">
              <Button
                type="submit"
                disabled={isSubmitting || !dirty || !isValid}
                variant="primary"
                className="mx-3"
              >
                {isSubmitting ? "Updating..." : "Update profile"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
});
