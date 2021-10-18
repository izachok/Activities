import { Col, Container, Row, Spinner } from "react-bootstrap";
import React, { useEffect, useState } from "react";

import ActivitiesFilters from "./ActivitiesFilters";
import ActivityList from "./ActivityList";
import ActivityListItemPlaceholder from "./ActivityListItemPlaceholder";
import InfiniteScroll from "react-infinite-scroller";
import { PagingParams } from "../../../app/models/pagination";
import { observer } from "mobx-react-lite";
import { useStore } from "./../../../app/stores/store";

function ActivityDashboard() {
  const { activityStore } = useStore();
  const {
    loadActivities,
    isInitialLoading,
    activityRegistry,
    setPagingParams,
    pagination,
  } = activityStore;

  const [loadingNext, setLoadingNext] = useState(false);

  function handleGetNext() {
    setLoadingNext(true);
    setPagingParams(new PagingParams(pagination!.currentPage + 1));
    loadActivities().then(() => setLoadingNext(false));
  }

  useEffect(() => {
    if (isInitialLoading || (activityRegistry && activityRegistry.size <= 1))
      loadActivities();
  }, [activityRegistry, isInitialLoading, loadActivities]);

  return (
    <Container className="py-4">
      <Row>
        <Col sm={8}>
          {isInitialLoading && !loadingNext ? (
            <>
              <ActivityListItemPlaceholder />
              <ActivityListItemPlaceholder />
            </>
          ) : (
            <InfiniteScroll
              pageStart={0}
              loadMore={handleGetNext}
              hasMore={
                !loadingNext &&
                !!pagination &&
                pagination.currentPage < pagination.totalPages
              }
              initialLoad={false}
            >
              <ActivityList />
            </InfiniteScroll>
          )}
        </Col>
        <Col sm={4}>
          <ActivitiesFilters />
        </Col>
        <Col xs={8} className="text-center">
          {loadingNext && (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default observer(ActivityDashboard);
