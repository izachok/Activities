import { ListGroup, Stack } from "react-bootstrap";

import ActivitiesListItem from "./ActivitiesListItem";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";

function ActivityList() {
  const { activityStore } = useStore();
  const { groupedActivities } = activityStore;

  return (
    <ListGroup>
      {groupedActivities.map(([groupDate, activities]) => {
        return (
          <Stack gap={0} key={groupDate} className="m-3">
            <p className="h5 text-primary">{groupDate}</p>
            {activities.map((item) => (
              <ActivitiesListItem activity={item} key={item.id} />
            ))}
          </Stack>
        );
      })}
    </ListGroup>
  );
}

export default observer(ActivityList);
