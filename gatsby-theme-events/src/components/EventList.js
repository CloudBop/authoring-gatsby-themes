import React from 'react';
import { Link } from 'gatsby';
//
function EventList({ events }) {
  return (
    <React.Fragment>
      <h1>Upcoming Events</h1>
      <ul>
        {events.map(event => (
          <li key={event.id}>
            <strong>
              <Link to={event.slug}>{event.name}</Link>
            </strong>
            <br />
            {new Date(event.startDate).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })}
            {`in ${event.location}`}
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
}

export default EventList;
