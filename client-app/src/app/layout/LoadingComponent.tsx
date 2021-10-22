import React, { HTMLProps } from "react";

import { Spinner } from "react-bootstrap";

interface Props extends HTMLProps<HTMLDivElement> {
  content?: string;
}

export default function LoadingComponent({ content, ...rest }: Props) {
  return (
    <div className="vw-100 vh-100 bg-light" {...rest}>
      <div className="d-flex h-100 justify-content-center align-items-center">
        <Spinner animation="border" role="status"></Spinner>
        <span>{content ?? "Loading..."}</span>
      </div>
    </div>
  );
}
