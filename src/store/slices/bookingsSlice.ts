
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Booking {
  id: string;
  areaId: string;
  title: string;
  description: string;
  user: string;
  startTime: string;
  endTime: string;
}

interface BookingsState {
  bookings: Booking[];
  selectedBookingId: string | null;
}

const initialState: BookingsState = {
  bookings: [],
  selectedBookingId: null,
};

export const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    addBooking: (state, action: PayloadAction<Booking>) => {
      state.bookings.push(action.payload);
    },
    updateBooking: (state, action: PayloadAction<Booking>) => {
      const index = state.bookings.findIndex((booking) => booking.id === action.payload.id);
      if (index !== -1) {
        state.bookings[index] = action.payload;
      }
    },
    removeBooking: (state, action: PayloadAction<string>) => {
      state.bookings = state.bookings.filter((booking) => booking.id !== action.payload);
    },
    setSelectedBookingId: (state, action: PayloadAction<string | null>) => {
      state.selectedBookingId = action.payload;
    },
  },
});

export const { addBooking, updateBooking, removeBooking, setSelectedBookingId } =
  bookingsSlice.actions;

export default bookingsSlice.reducer;
