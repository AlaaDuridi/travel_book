import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IHomeSearchRequestParams } from '../../types/models/home.model.ts';
import { DEFAULT_CHECK_IN_DATE, DEFAULT_CHECK_OUT_DATE } from '../../constants/room.constants.ts';

interface SearchState {
  params: IHomeSearchRequestParams;
}

const initialState: SearchState = {
  params: {
    city: '',
    checkInDate: DEFAULT_CHECK_IN_DATE,
    checkOutDate: DEFAULT_CHECK_OUT_DATE,
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
