import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IHomeSearchRequestParams, IHomeResult } from '../../types/models/home.model.ts';
import { searchHotelsAPI } from './searchAPI';

export interface SearchState {
  results: IHomeResult[];
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
}

const initialState: SearchState = {
  results: [],
  status: 'idle',
  error: null,
};

export const getSearchResultAsync = createAsyncThunk<IHomeResult[], IHomeSearchRequestParams>(
  'search/searchHotels',
  async (params: IHomeSearchRequestParams, { rejectWithValue }) => {
    try {
      return await searchHotelsAPI(params);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    clearSearchResults: (state) => {
      state.results = [];
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSearchResultAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getSearchResultAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.results = action.payload;
      })
      .addCase(getSearchResultAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { clearSearchResults } = searchSlice.actions;
export default searchSlice.reducer;
