import { Button, Container } from "react-bootstrap";

import { Link } from "react-router-dom";
import LoginForm from "../users/LoginForm";
import React from "react";
import { ReactComponent as ReactLogo } from "../../logo.svg";
import RegisterForm from "../users/RegisterForm";
import { observer } from "mobx-react-lite";
import { useStore } from "./../../app/stores/store";

export default observer(function HomePage() {
  const { userStore, modalStore } = useStore();
  return (
    <div className="body gradient-background text-light">
      <Container className="vh-100 d-flex align-items-center justify-content-center flex-column">
        <h1>
          <ReactLogo style={{ fill: "currentcolor" }} height="80" /> Activities
        </h1>
        {userStore.isLoggedIn ? (
          <>
            <h2>Welcome to Activities</h2>
            <Link to="/activities">
              <Button variant="outline-light">Go to Activities!</Button>
            </Link>
          </>
        ) : (
          <div>
            <Button
              variant="outline-light"
              onClick={() =>
                modalStore.openModal(<LoginForm />, "Login to Activities")
              }
              className="me-3"
            >
              Login
            </Button>
            <Button
              variant="outline-light"
              onClick={() =>
                modalStore.openModal(<RegisterForm />, "Register new user")
              }
            >
              Register
            </Button>
          </div>
        )}
      </Container>
    </div>
  );
});
