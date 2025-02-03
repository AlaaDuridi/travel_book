import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IRoom } from '../../types/models/room.model.ts';

interface CartState {
  bookedRooms: IRoom[];
  totalAmount: number;
}

const storageCart = localStorage.getItem('bookedRoomsCart');

const initialBookedRooms = storageCart ? JSON.parse(storageCart) : [];

const initialState: CartState = {
  bookedRooms: initialBookedRooms,
  totalAmount: initialBookedRooms.reduce((acc: number, room: IRoom) => acc + room.price, 0),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.bookedRooms = [];
      state.totalAmount = 0;
      localStorage.removeItem('bookedRoomsCart');
      return state;
    },
    addToCart: (state, action: PayloadAction<IRoom>) => {
      state.bookedRooms = [...state.bookedRooms, action.payload];
      state.totalAmount += action.payload.price;
      localStorage.setItem('bookedRoomsCart', JSON.stringify(state));
      return state;
    },
    removeFromCart: (state, action: PayloadAction<IRoom>) => {
      state.bookedRooms = state.bookedRooms.filter(
        (cartItem) => cartItem.roomNumber !== action.payload.roomNumber,
      );
      state.totalAmount -= action.payload.price;
      localStorage.setItem('bookedRoomsCart', JSON.stringify(state));
      return state;
    },
  },
});

export const { clearCart, addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
