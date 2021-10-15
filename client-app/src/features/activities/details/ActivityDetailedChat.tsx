import * as Yup from "yup";

import { Button, Card, Image } from "react-bootstrap";
import { Field, FieldProps, Form, Formik } from "formik";
import React, { useEffect } from "react";

import { Link } from "react-router-dom";
import { PencilFill } from "react-bootstrap-icons";
import { formatDistanceToNow } from "date-fns/esm";
import { observer } from "mobx-react-lite";
import { useStore } from "./../../../app/stores/store";

interface Props {
  activityId: string;
}

export default observer(function ActivityDetailedChat({ activityId }: Props) {
  const { commentStore } = useStore();

  useEffect(() => {
    if (activityId) {
      commentStore.createHubConnection(activityId);
    }
    return () => {
      commentStore.clearComments();
    };
  }, [activityId, commentStore]);

  return (
    <Card className="mt-3">
      <Card.Header>Chat about this event</Card.Header>
      <Card.Body>
        <Formik
          onSubmit={(values, { resetForm }) =>
            commentStore.addComment(values).then(() => resetForm())
          }
          initialValues={{ body: "" }}
          validationSchema={Yup.object({ body: Yup.string().required() })}
        >
          {({ isSubmitting, isValid, handleSubmit }) => (
            <Form className="mb-3">
              <Field name="body">
                {(props: FieldProps) => (
                  <textarea
                    className="w-100"
                    placeholder="Enter your comment (Enter to submit, Shift+Enter for new line)"
                    {...props.field}
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && e.shiftKey) {
                        return;
                      }
                      if (e.key === "Enter") {
                        e.preventDefault();
                        isValid && handleSubmit();
                      }
                    }}
                  ></textarea>
                )}
              </Field>
              <Button
                variant="primary"
                type="submit"
                disabled={isSubmitting || !isValid}
                className="ms-auto d-block"
              >
                <PencilFill /> Add reply
              </Button>
            </Form>
          )}
        </Formik>
        {commentStore.comments.map((comment) => (
          <div key={comment.id} className="d-flex">
            <Image
              src={comment.image || "/assets/user.png"}
              height={50}
              rounded
              className="me-2"
            />
            <div>
              <Link to={`/profiles/${comment.username}`}>
                <span className="fw-bold">{comment.displayName}</span>
              </Link>{" "}
              <span className="text-secondary">
                {formatDistanceToNow(comment.createdAt)} ago
              </span>
              <p style={{ whiteSpace: "pre-wrap" }}>{comment.body}</p>
            </div>
          </div>
        ))}
      </Card.Body>
    </Card>
  );
});
