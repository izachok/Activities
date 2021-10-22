import { Button, ButtonGroup, Container } from "react-bootstrap";
import React, { useState } from "react";

import ValidationErrors from "./ValidationErrors";
import axios from "axios";

export default function TestErrors() {
  const baseUrl = process.env.REACT_APP_API_URL;

  const [errors, setErrors] = useState(null);

  function handleNotFound() {
    axios
      .get(baseUrl + "buggy/not-found")
      .catch((err) => console.log(err.response));
  }

  function handleBadRequest() {
    axios
      .get(baseUrl + "buggy/bad-request")
      .catch((err) => console.log(err.response));
  }

  function handleServerError() {
    axios
      .get(baseUrl + "buggy/server-error")
      .catch((err) => console.log(err.response));
  }

  function handleUnauthorised() {
    axios
      .get(baseUrl + "buggy/unauthorised")
      .catch((err) => console.log(err.response));
  }

  function handleBadGuid() {
    axios.get(baseUrl + "activities/notaguid").catch((err) => console.log(err));
  }

  function handleValidationError() {
    axios.post(baseUrl + "activities", {}).catch((err) => setErrors(err));
  }

  return (
    <>
      <Container>
        <h1>Test Error component</h1>
        <ButtonGroup>
          <Button variant="outline-secondary" onClick={handleNotFound}>
            Not Found
          </Button>
          <Button variant="outline-secondary" onClick={handleBadRequest}>
            Bad Request
          </Button>
          <Button variant="outline-secondary" onClick={handleValidationError}>
            Validation Error
          </Button>
          <Button variant="outline-secondary" onClick={handleServerError}>
            Server Error
          </Button>
          <Button variant="outline-secondary" onClick={handleUnauthorised}>
            Unauthorised
          </Button>
          <Button variant="outline-secondary" onClick={handleBadGuid}>
            Bad Guid
          </Button>
        </ButtonGroup>
        {errors && <ValidationErrors errors={errors} />}
      </Container>
    </>
  );
}
