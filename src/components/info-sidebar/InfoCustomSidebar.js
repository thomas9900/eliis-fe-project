import React from 'react';
import { formatDate } from '@fullcalendar/core';
import './InfoCustomSidebar.css';
import { useSelector } from 'react-redux';

const InfoCustomSidebar = () => {
  const calendarEvents = useSelector((state) => state.calendar.calendarEvents);

  const renderSidebarEvent = (event) => {
    return (
      <li key={event.id}>
        <b>
          {formatDate(event.start, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </b>
        <i>{event.title}</i>
      </li>
    );
  };

  return (
    <div className="demo-app-sidebar">
      <div className="demo-app-sidebar-section">
        <h3>Event calendar</h3>
        <b>Instructions</b>
        <ul>
          <li>Select dates, and you will be prompted to create a new event</li>
          <li>Drag, drop, and resize events</li>
          <li>Click an event to edit it</li>
        </ul>
      </div>
      <div className="demo-app-sidebar-section">
        <h2>All Events ({calendarEvents.length})</h2>
        <ul>{calendarEvents.map(renderSidebarEvent)}</ul>
      </div>
    </div>
  );
};

export default InfoCustomSidebar;
