import * as Yup from "yup";

import { Button, Card, Container } from "react-bootstrap";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";

import { Activity } from "../../../app/models/activity";
import DateInput from "../../../app/common/form/DateInput";
import { Link } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import SelectInput from "../../../app/common/form/SelectInput";
import TextArea from "./../../../app/common/form/TextArea";
import TextInput from "../../../app/common/form/TextInput";
import { categoryOptions } from "./../../../app/common/options/categoryOptions";
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
    date: null,
    description: "",
    city: "",
    venue: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("The activity title is required"),
    description: Yup.string().required("The activity description is required"),
    date: Yup.string().required("The date is required").nullable(),
    category: Yup.string().required(),
    city: Yup.string().required(),
    venue: Yup.string().required(),
  });

  const [activity, setActivity] = useState<Activity>(initialState);

  useEffect(() => {
    if (id) loadActivity(id).then((activity) => setActivity(activity!));
  }, [id, loadActivity]);

  //TODO fix any
  function handleFormSubmit(activity: Activity) {
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

  if (isInitialLoading) <LoadingComponent />;

  return (
    <Container>
      <Card className="mt-3">
        <Card.Body>
          <Formik
            initialValues={activity}
            enableReinitialize
            onSubmit={(values) => handleFormSubmit(values)}
            validationSchema={validationSchema}
          >
            {({ handleSubmit, dirty, isSubmitting, isValid }) => (
              <Form onSubmit={handleSubmit} autoComplete="off">
                <h5>Activity details</h5>
                <TextInput placeholder="Title" name="title" />
                <TextArea placeholder="Description" name="description" />
                <SelectInput
                  placeholder="Category"
                  name="category"
                  options={categoryOptions}
                />
                <DateInput
                  placeholderText="Date"
                  name="date"
                  showTimeSelect
                  timeCaption="time"
                  timeFormat="hh:mm"
                  dateFormat="MMMM d, yyyy hh:mm"
                  className="form-control mt-4"
                />
                <h5 className="mt-3">Location details</h5>
                <TextInput placeholder="City" name="city" />
                <TextInput placeholder="Venue" name="venue" />
                <br />
                <div className="float-end">
                  <Button
                    type="submit"
                    disabled={isSubmitting || !dirty || !isValid}
                    variant="primary"
                    className="mx-3"
                  >
                    {isLoading ? "Loading..." : "Submit"}
                  </Button>
                  <Link to="/activities">
                    <Button type="button" variant="secondary">
                      Cancel
                    </Button>
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default observer(ActivityForm);
