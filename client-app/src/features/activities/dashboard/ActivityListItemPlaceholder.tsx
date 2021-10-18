import {
  Card,
  Image,
  ListGroup,
  ListGroupItem,
  Placeholder,
} from "react-bootstrap";

import React from "react";

export default function ActivityListItemPlaceholder() {
  return (
    <>
      <Card className="mb-3">
        <Card.Header>
          <Image
            roundedCircle
            src="/assets/user.png"
            height={100}
            className="float-start my-2 mx-3"
          />
          <Placeholder as={Card.Title} animation="glow">
            <Placeholder xs={6} />
          </Placeholder>
        </Card.Header>

        <Card.Body className="p-0">
          <ListGroup>
            <ListGroupItem className="py-2">
              <Placeholder as={Card.Text} animation="glow">
                <Placeholder xs={7} />
              </Placeholder>
            </ListGroupItem>
            <ListGroupItem>
              <Placeholder as={Card.Text} animation="glow">
                <Placeholder xs={7} /> <Placeholder xs={4} />{" "}
                <Placeholder xs={4} />
              </Placeholder>
            </ListGroupItem>
          </ListGroup>
        </Card.Body>
        <Card.Footer>
          <Image roundedCircle src="/assets/user.png" height="40" />
          <Image roundedCircle src="/assets/user.png" height="40" />
        </Card.Footer>
      </Card>
    </>
  );
}
