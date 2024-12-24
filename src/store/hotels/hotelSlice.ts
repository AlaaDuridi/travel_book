import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {fetchHotels, updateHotel} from './hotelAPI.ts';
import {IHotel} from '../../types/models/hotel.model.ts';
import {STATUS} from '../../constants/common.constants.ts';
import {CancelToken} from 'axios';
import {createHotelAPI, deleteHotelAPI, fetchHotelsByCityAPI} from '../cities/cityAPI.ts';
import axios from 'axios';

interface IHotelState {
    hotels: IHotel[];
    totalItems: number;
    totalPages: number;
    status: STATUS;

    selectedCityId?: number;
}

const initialState: IHotelState = {
    hotels: [],
    totalItems: 0,
    totalPages: 0,
    status: STATUS.IDLE,
};

export const fetchHotelsAsync = createAsyncThunk(
    'hotels/fetchHotels',
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
        const {data, total, totalPages} = await fetchHotels(
            searchQuery,
            pageSize,
            pageNumber,
            cancelToken,
        );
        return {hotels: data, total, totalPages};
    },
);

export const createHotelAsync = createAsyncThunk(
    'hotels/createHotel',
    async ({cityId, hotel}: { cityId: number; hotel: Omit<IHotel, 'id'> }) => {
        return await createHotelAPI(hotel, cityId);
    },
);
export const deleteHotelAsync = createAsyncThunk(
    'hotels/deleteHotel',
    async ({hotelId, cityId}: { hotelId: number; cityId: number }) => {
        await deleteHotelAPI(hotelId, cityId);
        return hotelId;
    },
);

export const updateHotelAsync = createAsyncThunk('hotels/updateHotel', async (hotel: IHotel) => {
    await updateHotel(hotel);
    return hotel;
});

export const fetchHotelsByCityAsync = createAsyncThunk(
    'hotels/fetchHotelsByCity',
    async ({
               cityId,
               searchQuery,
               pageSize,
               pageNumber,
               cancelToken,
           }: {
        cityId: number;
        searchQuery: string;
        pageSize: number;
        pageNumber: number;
        cancelToken: CancelToken;
    }) => {
        const {data} = await fetchHotelsByCityAPI(
            cityId,
            searchQuery,
            pageSize,
            pageNumber,
            cancelToken,
        );
        return {hotels: data};
    },
);

const hotelSlice = createSlice({
    name: 'hotels',
    initialState,
    reducers: {
        setSelectedCityId: (state, action: PayloadAction<number | undefined>) => {
            state.selectedCityId = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHotelsAsync.pending, (state) => {
                state.status = STATUS.LOADING;
            })
            .addCase(
                fetchHotelsAsync.fulfilled,
                (
                    state,
                    action: PayloadAction<{
                        hotels: IHotel[];
                        total: number;
                        totalPages: number;
                    }>,
                ) => {
                    state.status = STATUS.IDLE;
                    state.hotels = action.payload.hotels;
                    state.totalItems = action.payload.total;
                    state.totalPages = action.payload.totalPages;
                },
            )
            .addCase(fetchHotelsAsync.rejected, (state, action) => {
                if (!axios.isCancel(action.error)) {
                    state.status = STATUS.FAILED;
                }
            })
            .addCase(fetchHotelsByCityAsync.pending, (state) => {
                state.status = STATUS.LOADING;
            })
            .addCase(
                fetchHotelsByCityAsync.fulfilled,
                (
                    state,
                    action: PayloadAction<{
                        hotels: IHotel[];
                    }>,
                ) => {
                    state.status = STATUS.IDLE;
                    state.hotels = action.payload.hotels;
                    state.totalItems = state.hotels.length;
                    state.totalPages = 1;
                },
            )
            .addCase(fetchHotelsByCityAsync.rejected, (state, action) => {
                if (!axios.isCancel(action.error)) {
                    state.status = STATUS.FAILED;
                }
            })
            //create a hotel
            .addCase(createHotelAsync.pending, (state) => {
                state.status = STATUS.LOADING;
            })
            .addCase(createHotelAsync.fulfilled, (state, action: PayloadAction<IHotel>) => {
                state.hotels.push(action.payload);
                state.totalItems += 1;
                state.status = STATUS.IDLE;
            })
            .addCase(createHotelAsync.rejected, (state) => {
                state.status = STATUS.FAILED;
            })
            //update a hotel
            .addCase(updateHotelAsync.pending, (state) => {
                state.status = STATUS.LOADING;
            })
            .addCase(updateHotelAsync.fulfilled, (state, action: PayloadAction<IHotel>) => {
                state.status = STATUS.IDLE;
                const index = state.hotels.findIndex((hotel) => hotel.id === action.payload.id);
                if (index !== -1) {
                    state.hotels[index] = action.payload;
                }
            })
            .addCase(updateHotelAsync.rejected, (state) => {
                state.status = STATUS.FAILED;
            })
            //delete a hotel
            .addCase(deleteHotelAsync.pending, (state) => {
                state.status = STATUS.LOADING;
            })
            .addCase(deleteHotelAsync.fulfilled, (state, action: PayloadAction<number>) => {
                state.status = STATUS.IDLE;
                state.hotels = state.hotels.filter((hotel) => hotel.id !== action.payload); // Remove the deleted hotel
                state.totalItems -= 1;
            })
            .addCase(deleteHotelAsync.rejected, (state) => {
                state.status = STATUS.FAILED;
            });
    },
});
export const {setSelectedCityId} = hotelSlice.actions;
export default hotelSlice.reducer;
