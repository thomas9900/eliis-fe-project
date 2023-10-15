import { configureStore } from '@reduxjs/toolkit';
import calendarSlice from './calendar-slice';

const store = configureStore({
  reducer: { calendar: calendarSlice.reducer },
});

export default store;
