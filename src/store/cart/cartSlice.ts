import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IRoom } from '../../types/models/room.model.ts';
import dayjs from 'dayjs';

interface CartState {
  bookedRooms: {
    room: IRoom;
    checkInDate: string;
    checkOutDate: string;
    totalPrice: number;
  }[];
  totalAmount: number;
}

const storageCart = localStorage.getItem('bookedRoomsCart');
const initialBookedRooms = storageCart ? JSON.parse(storageCart) : { bookedRooms: [] };

const initialState: CartState = {
  bookedRooms: initialBookedRooms.bookedRooms || [],
  totalAmount: initialBookedRooms.bookedRooms.reduce(
    (acc: number, item: { totalPrice: number }) => acc + item.totalPrice || 0,
    0,
  ),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.bookedRooms = [];
      state.totalAmount = 0;
      localStorage.removeItem('bookedRoomsCart');
    },
    addToCart: (
      state,
      action: PayloadAction<{ room: IRoom; checkInDate: string; checkOutDate: string }>,
    ) => {
      const { room, checkInDate, checkOutDate } = action.payload;
      const checkIn = dayjs(checkInDate);
      const checkOut = dayjs(checkOutDate);

      const numberOfDays = checkOut.diff(checkIn, 'day');
      const totalPrice = numberOfDays * room.price;

      state.bookedRooms.push({ room, checkInDate, checkOutDate, totalPrice });
      state.totalAmount += totalPrice;
      localStorage.setItem('bookedRoomsCart', JSON.stringify(state));
    },
    removeFromCart: (state, action: PayloadAction<{ room: IRoom }>) => {
      const { room } = action.payload;
      const roomToRemoveIndex = state.bookedRooms.findIndex(
        (item) => item.room.roomNumber === room.roomNumber,
      );

      if (roomToRemoveIndex !== -1) {
        const roomToRemove = state.bookedRooms[roomToRemoveIndex];
        state.bookedRooms.splice(roomToRemoveIndex, 1);
        state.totalAmount -= roomToRemove.totalPrice;
        localStorage.setItem('bookedRoomsCart', JSON.stringify(state));
      }
    },
    updateRoomDates: (
      state,
      action: PayloadAction<{ room: IRoom; checkInDate: string; checkOutDate: string }>,
    ) => {
      const { room, checkInDate, checkOutDate } = action.payload;
      const roomIndex = state.bookedRooms.findIndex(
        (item) => item.room.roomNumber === room.roomNumber,
      );

      if (roomIndex !== -1) {
        const updatedRoom = state.bookedRooms[roomIndex];
        const checkIn = dayjs(checkInDate);
        const checkOut = dayjs(checkOutDate);

        const numberOfDays = checkOut.diff(checkIn, 'day');
        const newTotalPrice = numberOfDays * room.price;

        updatedRoom.checkInDate = checkInDate;
        updatedRoom.checkOutDate = checkOutDate;
        updatedRoom.totalPrice = newTotalPrice;

        // Update total amount for the cart
        state.totalAmount = state.bookedRooms.reduce((acc, item) => acc + item.totalPrice, 0);

        localStorage.setItem('bookedRoomsCart', JSON.stringify(state));
      }
    },
  },
});

export const { clearCart, addToCart, removeFromCart, updateRoomDates } = cartSlice.actions;

export default cartSlice.reducer;
