import { createSlice } from '@reduxjs/toolkit';

const calendarSlice = createSlice({
  name: 'calendar',
  initialState: { calendarEvents: [] },
  reducers: {
    setCalendarEvents: (state, action) => {
      state.calendarEvents = action.payload;
    },
    updateCalendarEvents: (state, action) => {
      const updatedEvent = action.payload;
      const eventIndex = state.calendarEvents.findIndex(
        (event) => event.id === updatedEvent.id
      );

      if (eventIndex !== -1) {
        state.calendarEvents[eventIndex] = updatedEvent;
      } else {
        state.calendarEvents.push(updatedEvent);
      }
    },
    deleteCalendarEvents: (state, action) => {
      state.calendarEvents = state.calendarEvents.filter(
        (event) => event.id !== action.payload
      );
    },
  },
});

export const { setCalendarEvents, updateCalendarEvents, deleteCalendarEvents } =
  calendarSlice.actions;

export default calendarSlice;
