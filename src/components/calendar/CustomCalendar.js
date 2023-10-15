import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  setCalendarEvents,
  updateCalendarEvents,
  deleteCalendarEvents,
} from '../../store/calendar-slice';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Button } from 'react-bootstrap';
import { uid } from 'uid';
import EventModal from './EventModal';

function CustomCalendar() {
  const dispatch = useDispatch();

  const [currentEvents, setCurrentEvents] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editEvent, setEditEvent] = useState(null);
  const [eventTitle, setEventTitle] = useState('');
  const [modalTitle, setModalTitle] = useState('Create Event');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadEventsFromLocalStorage();
    setIsLoading(false);
  }, []);

  const loadEventsFromLocalStorage = () => {
    const storedEvents = localStorage.getItem('calendarEvents');
    if (storedEvents) {
      const parsedEvents = JSON.parse(storedEvents);
      setCurrentEvents(parsedEvents);
      dispatch(setCalendarEvents(parsedEvents));
    }
  };

  const handleDateSelect = (selectInfo) => {
    setEventTitle('');
    setEditEvent({
      startStr: selectInfo.startStr,
      endStr: selectInfo.endStr,
      allDay: selectInfo.allDay,
      calendar: selectInfo.view.calendar,
    });
    setModalTitle('Create Event');
    setModalOpen(true);
  };

  const openEditModal = (eventInfo) => {
    setEventTitle(eventInfo.event.title);
    setEditEvent(eventInfo.event);
    setModalTitle('Edit Event');
    setModalOpen(true);
  };

  const closeEditModal = () => {
    setModalOpen(false);
  };

  const saveEvent = () => {
    if (editEvent) {
      if (editEvent.id) {
        // Editing an existing event
        const updatedEvent = currentEvents.find(
          (event) => event.id === editEvent.id
        );
        if (updatedEvent) {
          updatedEvent.setProp('title', eventTitle);
          updatedEvent.setStart(editEvent.startStr);
          updatedEvent.setEnd(editEvent.endStr);
          const updatedEventData = {
            id: updatedEvent.id,
            title: eventTitle,
            start: editEvent.startStr,
            end: editEvent.endStr,
            allDay: updatedEvent.allDay,
          };
          dispatch(updateCalendarEvents(updatedEventData));
        }
      } else if (editEvent.calendar) {
        // Creating a new event
        const { startStr, endStr, allDay } = editEvent;
        const newEvent = {
          id: uid(),
          title: eventTitle,
          start: startStr,
          end: endStr,
          allDay: allDay,
        };
        editEvent.calendar.addEvent(newEvent);
        dispatch(updateCalendarEvents(newEvent));
      }
    } else {
      console.error('Invalid save event');
    }

    setEventTitle('');
    setEditEvent(null);
    setModalOpen(false);
  };

  const handleDeleteClick = (eventInfo) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${eventInfo.event.title}'`
      )
    ) {
      eventInfo.event.remove();
      dispatch(deleteCalendarEvents(eventInfo.event.id));
      const updatedEvents = currentEvents.filter(
        (event) => event.id !== eventInfo.event.id
      );
      setCurrentEvents(updatedEvents);
      localStorage.setItem('calendarEvents', JSON.stringify(updatedEvents));
    }
  };

  const renderEventContent = (eventInfo) => {
    return (
      <div className="d-flex justify-content-between align-items-center">
        <div
          className="d-flex flex-grow-1 py-2"
          onClick={() => openEditModal(eventInfo)}
        >
          <b>{eventInfo.timeText}</b>
          <i>{eventInfo.event.title}</i>
        </div>
        <div className="d-flex align-items-center">
          <Button
            onClick={() => handleDeleteClick(eventInfo)}
            size="sm"
            variant="danger"
          >
            ✕
          </Button>
        </div>
      </div>
    );
  };

  const handleEvents = (events) => {
    setCurrentEvents(events);
    localStorage.setItem('calendarEvents', JSON.stringify(events));

    const serializedEvents = events.map((event) => ({
      id: event.id,
      title: event.title,
      start: event.start.toISOString(), // Serialize the Date object for Redux
      end: event.end.toISOString(),
      allDay: event.allDay,
    }));
    dispatch(setCalendarEvents(serializedEvents));
  };

  return (
    <>
      <div className="demo-app-main">
        {isLoading ? (
          <p>Loading data...</p>
        ) : (
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay',
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            initialEvents={currentEvents}
            select={handleDateSelect}
            eventContent={renderEventContent}
            eventsSet={handleEvents}
          />
        )}
        <EventModal
          isModalOpen={isModalOpen}
          modalTitle={modalTitle}
          eventTitle={eventTitle}
          setEventTitle={setEventTitle}
          closeEditModal={closeEditModal}
          saveEvent={saveEvent}
        />
      </div>
    </>
  );
}

export default CustomCalendar;
