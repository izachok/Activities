import { Badge, Image, ListGroup, ListGroupItem } from "react-bootstrap";

import React from "react";

export default function ActivityDetailedSidebar() {
  return (
    <ListGroup>
      <ListGroupItem active>3 People Going</ListGroupItem>
      <ListGroupItem className="p-3">
        <Image
          src="/assets/user.png"
          height="60"
          className="float-start me-2"
        />
        <h5>
          Bob{" "}
          <Badge bg="warning" className="float-end">
            Host
          </Badge>
        </h5>
        <div className="text-warning">Following</div>
      </ListGroupItem>
      <ListGroupItem className="p-3">
        <Image
          src="/assets/user.png"
          height="60"
          className="float-start me-2"
        />
        <h5>Bob </h5>
        <div className="text-warning">Following</div>
      </ListGroupItem>
      <ListGroupItem className="p-3">
        <Image
          src="/assets/user.png"
          height="60"
          className="float-start me-2"
        />
        <h5>Sally </h5>
      </ListGroupItem>
    </ListGroup>
  );
}
