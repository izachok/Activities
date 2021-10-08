import { ErrorMessage, Form, Formik } from "formik";

import { Button } from "react-bootstrap";
import React from "react";
import TextInput from "../../app/common/form/TextInput";
import { observer } from "mobx-react-lite";
import { useStore } from "./../../app/stores/store";

function LoginForm() {
  const { userStore } = useStore();

  return (
    <Formik
      initialValues={{ email: "", password: "", error: null }}
      onSubmit={(values, { setErrors }) =>
        userStore
          .login(values)
          .catch((error) => setErrors({ error: "Invalid email or password" }))
      }
    >
      {({ handleSubmit, isSubmitting, errors }) => (
        <Form onSubmit={handleSubmit}>
          <TextInput name="email" placeholder="Email" />
          <TextInput name="password" placeholder="Password" type="password" />
          <ErrorMessage
            name="error"
            render={() => <p className="text-danger mt-2">{errors.error}</p>}
          />
          <br />
          <Button type="submit" variant="success" disabled={isSubmitting}>
            Login
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default observer(LoginForm);
