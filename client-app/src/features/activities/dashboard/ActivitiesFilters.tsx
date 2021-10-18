import { ListGroup, ListGroupItem } from "react-bootstrap";

import Calendar from "react-calendar";
import { FunnelFill } from "react-bootstrap-icons";
import React from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "./../../../app/stores/store";

export default observer(function ActivitiesFilters() {
  const {
    activityStore: { predicate, setPredicate },
  } = useStore();

  return (
    <>
      <ListGroup className="mb-3 mt-5">
        <ListGroupItem className="h5 m-0 text-primary">
          <FunnelFill className="me-2" />
          Filters
        </ListGroupItem>
        <ListGroupItem
          active={predicate.has("all")}
          onClick={() => setPredicate("all", "true")}
        >
          All Activities
        </ListGroupItem>
        <ListGroupItem
          active={predicate.has("isGoing")}
          onClick={() => setPredicate("isGoing", "true")}
        >
          I'm going
        </ListGroupItem>
        <ListGroupItem
          active={predicate.has("isHost")}
          onClick={() => setPredicate("isHost", "true")}
        >
          I'm hosting
        </ListGroupItem>
      </ListGroup>
      <Calendar
        onChange={(date: Date) => setPredicate("startDate", date)}
        value={predicate.get("startDate") || new Date()}
      />
    </>
  );
});
