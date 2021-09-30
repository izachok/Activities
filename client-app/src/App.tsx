import "./App.css";

import { Container, ListGroup, ListGroupItem } from "react-bootstrap";
import React, { useEffect, useState } from "react";

import { PeopleFill } from "react-bootstrap-icons";
import axios from "axios";

function App() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axios.get("https://localhost:5001/api/activities").then((response) => {
      setActivities(response.data);
    });
  }, []);

  return (
    <div>
      <header>
        <PeopleFill size={48} />
      </header>
      <Container>
        <ListGroup>
          {activities.map((activity: any) => (
            <ListGroupItem key={activity.id}>{activity.title}</ListGroupItem>
          ))}
        </ListGroup>
      </Container>
    </div>
  );
}

export default App;
