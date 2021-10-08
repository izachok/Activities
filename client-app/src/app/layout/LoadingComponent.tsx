import React from "react";
import { Spinner } from "react-bootstrap";

export default function LoadingComponent() {
  //todo fix component style and add text prop
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <div className="d-flex h-100 justify-content-center align-items-center">
        <Spinner animation="border" role="status"></Spinner>
        <span>Loading...</span>
      </div>
    </div>
  );
}
