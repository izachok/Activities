import * as Yup from "yup";

import { ErrorMessage, Form, Formik } from "formik";

import { Button } from "react-bootstrap";
import React from "react";
import TextInput from "../../app/common/form/TextInput";
import ValidationErrors from "../errors/ValidationErrors";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";

function RegisterForm() {
  const { userStore } = useStore();

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        username: "",
        displayName: "",
        error: null,
      }}
      onSubmit={(values, { setErrors }) =>
        userStore.register(values).catch((error) => setErrors({ error: error }))
      }
      validationSchema={Yup.object({
        displayName: Yup.string().required(),
        username: Yup.string().required(),
        email: Yup.string().email().required(),
        password: Yup.string().required(),
      })}
    >
      {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
        <Form onSubmit={handleSubmit}>
          <TextInput name="displayName" placeholder="Display name" />
          <TextInput name="username" placeholder="Username" />
          <TextInput name="email" placeholder="Email" />
          <TextInput name="password" placeholder="Password" type="password" />
          <ErrorMessage
            name="error"
            render={() => <ValidationErrors errors={errors.error} />}
          />
          <br />
          <Button
            type="submit"
            variant="success"
            disabled={isSubmitting || !isValid || !dirty}
          >
            Register
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default observer(RegisterForm);
