import { Badge, Button, Card } from "react-bootstrap";

import { Activity } from "./../../../app/models/activity";
import { Link } from "react-router-dom";
import React from "react";
import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";

interface Props {
  activity: Activity;
}

export default observer(function ActivityDetailedHeader({ activity }: Props) {
  const { activityStore } = useStore();

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
          {activity.isCancelled && (
            <Badge bg="danger">This activity is cancelled</Badge>
          )}
          <Card.Title>{activity.title}</Card.Title>
          <Card.Text>{format(activity.date!, "dd MMM yyyy")}</Card.Text>
          <Card.Text>
            Hosted by{" "}
            <Link
              to={`/profiles/${activity.hostUsername}`}
              className="text-white"
            >
              {activity.host?.displayName}
            </Link>
          </Card.Text>
        </Card.ImgOverlay>
      </div>
      <Card.Body>
        {!activity.isGoing && (
          <Button onClick={activityStore.updateAttendance}>
            {activityStore.isLoading ? "Joining..." : "Join activity"}
          </Button>
        )}
        {activity.isGoing && !activity.isHost && (
          <Button
            onClick={activityStore.updateAttendance}
            variant="outline-secondary"
            className="mx-3"
          >
            {activityStore.isLoading ? "Cancelling.." : "Cancel attendance"}
          </Button>
        )}
        {activity.isHost && (
          <>
            <Button
              onClick={activityStore.cancelActivityToggle}
              variant={activity.isCancelled ? "success" : "danger"}
              className="mx-3"
            >
              {activityStore.isLoading
                ? "Processing.."
                : activity.isCancelled
                ? "Re-activate activity"
                : "Cancel activity"}
            </Button>
            <Link to={`/manage/${activity.id}`}>
              <Button
                variant="warning"
                className="float-end"
                disabled={activity.isCancelled}
              >
                Manage event
              </Button>
            </Link>
          </>
        )}
      </Card.Body>
    </Card>
  );
});
