import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBookingResponse } from '../../types/models/booking.model.ts';

interface BookingState {
  bookings: IBookingResponse[][]; // Store each booking as an array, representing a complete payment process
}

const initialState: BookingState = {
  bookings: [],
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    addBooking(state, action: PayloadAction<IBookingResponse[]>) {
      state.bookings.push(action.payload); // Push the entire array (payment and booked items) into the bookings array
    },
  },
});

export const { addBooking } = bookingSlice.actions;

export default bookingSlice.reducer;
