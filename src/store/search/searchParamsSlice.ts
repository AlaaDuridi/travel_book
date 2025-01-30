import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IHomeSearchRequestParams } from '../../types/models/home.model.ts';

interface SearchState {
  params: IHomeSearchRequestParams;
}

const initialState: SearchState = {
  params: {
    city: '',
    checkInDate: '',
    checkOutDate: '',
    numberOfRooms: 1,
    adults: 2,
    children: 0,
    sort: 'price',
    starRate: 4,
  },
};

const searchParamsSlice = createSlice({
  name: 'searchParams',
  initialState,
  reducers: {
    setSearchParams: (state, action: PayloadAction<IHomeSearchRequestParams>) => {
      state.params = action.payload;
    },
  },
});

export const { setSearchParams } = searchParamsSlice.actions;
export default searchParamsSlice.reducer;
