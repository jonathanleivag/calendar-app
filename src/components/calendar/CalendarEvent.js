import React from "react";

export const CalendarEvent = ({ event }) => {
  const {
    title,
    user: { name },
  } = event;
  return (
    <div>
      <span> {title} </span>
      <strong> -{name} </strong>
    </div>
  );
};
