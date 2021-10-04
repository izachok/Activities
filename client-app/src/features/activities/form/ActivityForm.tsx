import { Button, Card, Form, FormControl } from "react-bootstrap";
import React, { ChangeEvent, useState } from "react";

import { observer } from "mobx-react-lite";
import { useStore } from "./../../../app/stores/store";

function ActivityForm() {
  const { activityStore } = useStore();
  const { selectedActivity, createActivity, updateActivity, isLoading } =
    activityStore;

  const initialState = selectedActivity ?? {
    id: "",
    title: "",
    category: "",
    date: "",
    description: "",
    city: "",
    venue: "",
  };

  const [activity, setActivity] = useState(initialState);

  //TODO fix any
  function handleSubmit(event: any) {
    event.preventDefault();
    if (activity.id) {
      updateActivity(activity);
    } else {
      createActivity(activity);
    }
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  }

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
            <Button
              type="button"
              variant="secondary"
              onClick={activityStore.closeForm}
            >
              Cancel
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default observer(ActivityForm);
