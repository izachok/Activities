import { Button, Card } from "react-bootstrap";

import { Activity } from "./../../../app/models/activity";
import { Link } from "react-router-dom";
import React from "react";
import { format } from "date-fns";

interface Props {
  activity: Activity;
}

export default function ActivityDetailedHeader({ activity }: Props) {
  return (
    <Card className="mb-3">
      <div className="position-relative">
        <Card.Img
          variant="top"
          src={`/assets/categoryImages/${activity.category}.jpg`}
        />
        <Card.ImgOverlay
          className="opacity-50"
          style={{ backgroundColor: "black" }}
        />
        <Card.ImgOverlay className="text-white">
          <Card.Title>{activity.title}</Card.Title>
          <Card.Text>{format(activity.date!, "dd MMM yyyy")}</Card.Text>
          <Card.Text>Hosted by Bob</Card.Text>
        </Card.ImgOverlay>
      </div>
      <Card.Body>
        {/* <ButtonGroup className="container-fluid">
          <NavLink to={`/manage/${activity.id}`}>
            <Button variant="outline-primary">Edit</Button>
          </NavLink>
          <NavLink to="/activities">
            <Button variant="outline-secondary">Cancel</Button>
          </NavLink>
        </ButtonGroup> */}
        <Button>Join activity</Button>
        <Button variant="outline-secondary" className="mx-3">
          Cancel attendance
        </Button>
        <Link to={`/manage/${activity.id}`}>
          <Button variant="warning" className="float-end">
            Manage event
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
}
