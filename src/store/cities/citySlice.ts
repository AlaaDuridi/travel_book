import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {fetchCitiesAPI, addCityAPI, updateCityAPI, deleteCityAPI} from './cityAPI';
import {ICity} from '../../types/models/city.model.ts';
import {CancelToken} from 'axios';

export interface CityState {
    cities: ICity[];
    loading: boolean;
    error: string | null;
}

const initialState: CityState = {
    cities: [],
    loading: false,
    error: null,
};

// Async thunks
export const fetchCities = createAsyncThunk(
    'cities/fetchCities',
    async ({
               searchQuery,
               pageSize,
               pageNumber,
               cancelToken,
           }: {
        searchQuery: string;
        pageSize: number;
        pageNumber: number;
        cancelToken?: CancelToken;
    }) => {
        return await fetchCitiesAPI(searchQuery, pageSize, pageNumber, cancelToken);
    },
);

export const addCity = createAsyncThunk(
    'cities/addCity',
    async (city: Pick<ICity, 'name' | 'description'>, {rejectWithValue}) => {
        try {
            return await addCityAPI(city);
        } catch (error) {
            return rejectWithValue('Failed to add city');
        }
    },
);

export const updateCity = createAsyncThunk(
    'cities/updateCity',
    async (city: ICity, {rejectWithValue}) => {
        try {
            return await updateCityAPI(city);
        } catch (error) {
            return rejectWithValue('Failed to update city');
        }
    },
);

export const deleteCity = createAsyncThunk(
    'cities/deleteCity',
    async (cityId: number, {rejectWithValue}) => {
        try {
            await deleteCityAPI(cityId);
            return cityId;
        } catch (error) {
            return rejectWithValue('Failed to delete city');
        }
    },
);

// Slice
const citySlice = createSlice({
    name: 'cities',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Cities
            .addCase(fetchCities.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCities.fulfilled, (state, action: PayloadAction<ICity[]>) => {
                state.loading = false;
                state.cities = action.payload;
            })
            .addCase(fetchCities.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Add City
            .addCase(addCity.fulfilled, (state, action: PayloadAction<ICity>) => {
                state.cities.push(action.payload);
            })
            .addCase(addCity.rejected, (state, action) => {
                state.error = action.payload as string;
            })
            // Update City
            .addCase(updateCity.fulfilled, (state, action: PayloadAction<ICity>) => {
                const index = state.cities.findIndex((city) => city.id === action.payload.id);
                if (index !== -1) {
                    state.cities[index] = action.payload;
                }
            })
            .addCase(updateCity.rejected, (state, action) => {
                state.error = action.payload as string;
            })
            // Delete City
            .addCase(deleteCity.fulfilled, (state, action: PayloadAction<number>) => {
                state.cities = state.cities.filter((city) => city.id !== action.payload);
            })
            .addCase(deleteCity.rejected, (state, action) => {
                state.error = action.payload as string;
            });
    },
});

export default citySlice.reducer;
