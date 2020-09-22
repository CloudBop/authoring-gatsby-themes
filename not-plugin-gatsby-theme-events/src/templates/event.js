import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import EventPage from '../components/event';

// - page query needed for graphql variables
// - pass into data prop of Event "4bb3bb5e-c4f3-52ba-8ed4-5635fbf5def5"
export const query = graphql`
  query($eventID: String!) {
    event(id: { eq: $eventID }) {
      name
      url
      startDate(formatString: "MMMM D, YYYY")
      endDate(formatString: "MMMM D, YYYY")
      location
      slug
    }
  }
`;
//
function EventTemplate({ data: { event } }) {
  return (
    <Layout>
      <EventPage {...event} />
    </Layout>
  );
}

export default EventTemplate;
