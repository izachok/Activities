import { Button, Card, Form, FormControl } from "react-bootstrap";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";

import { Link } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { observer } from "mobx-react-lite";
import { useStore } from "./../../../app/stores/store";
import { v4 as uuid } from "uuid";

function ActivityForm() {
  const { activityStore } = useStore();
  const {
    createActivity,
    updateActivity,
    isLoading,
    loadActivity,
    isInitialLoading,
  } = activityStore;

  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  const initialState = {
    id: "",
    title: "",
    category: "",
    date: "",
    description: "",
    city: "",
    venue: "",
  };

  const [activity, setActivity] = useState(initialState);

  useEffect(() => {
    if (id) loadActivity(id).then((activity) => setActivity(activity!));
  }, [id, loadActivity]);

  //TODO fix any
  function handleSubmit(event: any) {
    event.preventDefault();
    if (activity.id.length === 0) {
      const newActivity = { ...activity, id: uuid() };
      createActivity(newActivity).then(() =>
        history.push(`/activities/${newActivity.id}`)
      );
    } else {
      updateActivity(activity).then(() =>
        history.push(`/activities/${activity.id}`)
      );
    }
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  }

  if (isInitialLoading) <LoadingComponent />;

  return (
    <Card>
      <Card.Body>
        <Form onSubmit={handleSubmit} autoComplete="off">
          <FormControl
            type="text"
            placeholder="Title"
            className="mb-3"
            value={activity.title}
            name="title"
            onChange={handleInputChange}
          />
          <FormControl
            as="textarea"
            placeholder="Description"
            className="mb-3"
            value={activity.description}
            name="description"
            onChange={handleInputChange}
          />
          <FormControl
            type="text"
            placeholder="Category"
            className="mb-3"
            value={activity.category}
            name="category"
            onChange={handleInputChange}
          />
          <FormControl
            type="date"
            placeholder="Date"
            className="mb-3"
            value={activity.date}
            name="date"
            onChange={handleInputChange}
          />
          <FormControl
            type="text"
            placeholder="City"
            className="mb-3"
            value={activity.city}
            name="city"
            onChange={handleInputChange}
          />
          <FormControl
            type="text"
            placeholder="Venue"
            className="mb-3"
            value={activity.venue}
            name="venue"
            onChange={handleInputChange}
          />
          <div className="float-end">
            <Button type="submit" variant="primary" className="mx-3">
              {isLoading ? "Loading..." : "Submit"}
            </Button>
            <Link to="/activities">
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </Link>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default observer(ActivityForm);
