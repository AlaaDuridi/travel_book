import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IHotelDetails, IHotelGallery, IHotelReview } from '../../types/models/hotel.model';
import { getDetails, getGallery, getReviews, getAvailableRooms } from './hotelAPI';
import { IRoom } from '../../types/models/room.model.ts';

interface HotelState {
  details: IHotelDetails | null;
  gallery: IHotelGallery[];
  reviews: IHotelReview[];
  rooms: IRoom[];
  loading: boolean;
  error: string | null;
}

const initialState: HotelState = {
  details: null,
  gallery: [],
  reviews: [],
  rooms: [],
  loading: false,
  error: null,
};

export const fetchHotelData = createAsyncThunk(
  'hotel/fetchHotelData',
  async (hotelId: number, { rejectWithValue }) => {
    try {
      const [details, gallery, reviews, rooms] = await Promise.all([
        getDetails(hotelId),
        getGallery(hotelId),
        getReviews(hotelId),
        getAvailableRooms(hotelId),
      ]);
      return { details, gallery, reviews, rooms };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const hotelSlice = createSlice({
  name: 'hotel',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHotelData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHotelData.fulfilled, (state, action) => {
        state.loading = false;
        state.details = action.payload.details;
        state.gallery = action.payload.gallery;
        state.reviews = action.payload.reviews;
        state.rooms = action.payload.rooms;
      })
      .addCase(fetchHotelData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default hotelSlice.reducer;
