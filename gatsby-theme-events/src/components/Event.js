import React from 'react';

const getFormattedDate = (date, { day = true, month = true, year = true } = {}) => {
  //
  return date.toLocaleDateString('en-US', {
    day: day ? 'numeric' : undefined,
    month: month ? 'long' : undefined,
    year: year ? 'numeric' : undefined
  });
};

const EventDate = ({ startDate, endDate }) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const isOneDayEvent = start.toDateString() === end.toDateString();
  //

  return (
    <React.Fragment>
      <time dateTime={start.toISOString()}>{getFormattedDate(start, { year: isOneDayEvent })} </time>
      {!isOneDayEvent && (
        <React.Fragment>
          -
          <time dateTime={end.toISOString()}>
            {getFormattedDate(end, { month: start.getMonth() !== end.getMonth() })}{' '}
          </time>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

function Event({ name, location, url, startDate, endDate }) {
  return (
    <div>
      <h1>
        {name} {location}
      </h1>
      <p>
        <EventDate startDate={startDate} endDate={endDate} />
      </p>
      <p>
        website: <a href={url}>{url}</a>
      </p>
    </div>
  );
}

export default Event;
