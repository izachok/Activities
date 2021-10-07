import { Form } from "react-bootstrap";
import React from "react";
import { useField } from "formik";

interface Props {
  placeholder: string;
  name: string;
  label?: string;
}

export default function TextInput(props: Props) {
  const [field, meta] = useField(props.name);

  return (
    <Form.Group>
      <Form.Label>{props.label}</Form.Label>
      <Form.Control
        {...field}
        {...props}
        isInvalid={meta.touched && !!meta.error}
      />
      {meta.touched && meta.error ? (
        <Form.Control.Feedback type="invalid">
          {meta.error}
        </Form.Control.Feedback>
      ) : null}
    </Form.Group>
  );
}
