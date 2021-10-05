import { ListGroup, ListGroupItem } from "react-bootstrap";

import Calendar from "react-calendar";
import { FunnelFill } from "react-bootstrap-icons";
import React from "react";

export default function ActivitiesFilters() {
  return (
    <>
      <ListGroup className="mb-3 mt-5">
        <ListGroupItem className="h5 m-0 text-primary">
          <FunnelFill className="me-2" />
          Filters
        </ListGroupItem>
        <ListGroupItem>All Activities</ListGroupItem>
        <ListGroupItem>I'm going</ListGroupItem>
        <ListGroupItem>I'm hosting</ListGroupItem>
      </ListGroup>
      <Calendar />
    </>
  );
}
