import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getRoom, updateRoom } from './roomAPI';
import { createHotelRoom, deleteHotelRoom, fetchHotelRooms } from '../hotels/hotelAPI';
import { IRoom } from '../../types/models/room.model';

interface IRoomState {
  rooms: IRoom[];
  roomDetails: IRoom | null;
  loading: boolean;
  error: string | null;
}

const initialState: IRoomState = {
  rooms: [],
  roomDetails: null,
  loading: false,
  error: null,
};

// Async thunks
export const fetchHotelRoomsAsync = createAsyncThunk(
  'rooms/fetchHotelRooms',
  async ({
    hotelId,
    checkInDate,
    checkOutDate,
  }: {
    hotelId: number;
    checkInDate: string;
    checkOutDate: string;
  }) => {
    return await fetchHotelRooms(hotelId, checkInDate, checkOutDate);
  },
);

export const createRoomAsync = createAsyncThunk(
  'rooms/createRoom',
  async (payload: { hotelId: number; roomNumber: number; cost: number }) => {
    return await createHotelRoom(payload);
  },
);

export const deleteRoomAsync = createAsyncThunk(
  'rooms/deleteRoom',
  async ({ hotelId, roomId }: { hotelId: number; roomId: number }) => {
    await deleteHotelRoom(hotelId, roomId);
    return roomId;
  },
);

export const updateRoomAsync = createAsyncThunk('rooms/updateRoom', async (room: IRoom) => {
  await updateRoom(room);
  return room;
});

export const getRoomDetailsAsync = createAsyncThunk(
  'rooms/getRoomDetails',
  async (roomId: number) => {
    return await getRoom(roomId);
  },
);

// Slice
const roomSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch rooms
      .addCase(fetchHotelRoomsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHotelRoomsAsync.fulfilled, (state, action: PayloadAction<IRoom[]>) => {
        state.loading = false;
        state.rooms = action.payload;
      })
      .addCase(fetchHotelRoomsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create room
      .addCase(createRoomAsync.fulfilled, (state, action: PayloadAction<IRoom>) => {
        state.rooms.push(action.payload);
        state.loading = false;
      })
      .addCase(createRoomAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete room
      .addCase(deleteRoomAsync.fulfilled, (state, action: PayloadAction<number>) => {
        state.rooms = state.rooms.filter((room) => room.id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteRoomAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update room
      .addCase(updateRoomAsync.fulfilled, (state, action: PayloadAction<IRoom>) => {
        const index = state.rooms.findIndex((room) => room.id === action.payload.id);
        if (index !== -1) {
          state.rooms[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(updateRoomAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Get room details
      .addCase(getRoomDetailsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRoomDetailsAsync.fulfilled, (state, action: PayloadAction<IRoom>) => {
        state.loading = false;
        state.roomDetails = action.payload;
      })
      .addCase(getRoomDetailsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default roomSlice.reducer;
