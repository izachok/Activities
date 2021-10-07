import { Form } from "react-bootstrap";
import React from "react";
import { useField } from "formik";

interface Props {
  placeholder: string;
  name: string;
  options: { text: string; value: string }[];
  label?: string;
}

export default function SelectInput(props: Props) {
  const [field, meta, helpers] = useField(props.name);

  return (
    <Form.Group>
      <Form.Label>{props.label}</Form.Label>
      <Form.Control
        as="select"
        {...field}
        {...props}
        onChange={(e) => helpers.setValue(e.target.value)}
        onBlur={() => helpers.setTouched(true)}
        isInvalid={meta.touched && !!meta.error}
      >
        <option value="">Choose one...</option>
        {props.options.map((o) => (
          <option value={o.value} key={o.value}>
            {o.text}
          </option>
        ))}
      </Form.Control>
      {meta.touched && meta.error ? (
        <Form.Control.Feedback type="invalid">
          {meta.error}
        </Form.Control.Feedback>
      ) : null}
    </Form.Group>
  );
}
