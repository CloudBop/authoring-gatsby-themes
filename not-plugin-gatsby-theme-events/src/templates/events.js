import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Layout from '../components/layout';
import EventList from '../components/event-list';
//
function EventsTemplate() {
  // query this
  const data = useStaticQuery(graphql`
    query {
      allEvent(sort: { fields: startDate, order: ASC }) {
        nodes {
          id
          name
          startDate
          endDate
          location
          url
          slug
        }
      }
    }
  `);
  // alias for better refer
  const events = data.allEvent.nodes;
  //
  return (
    <Layout>
      <EventList events={events} />
    </Layout>
  );
}

export default EventsTemplate;
