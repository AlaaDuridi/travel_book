import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import citiesReducer from './cities/citySlice';
import hotelsReducer from './hotels/hotelSlice';

export const rootReducer = {
  auth: authReducer,
  cities: citiesReducer,
  hotels: hotelsReducer,
};

export const store = configureStore({
  reducer: rootReducer,
});

export type TAppDispatch = typeof store.dispatch;
export type TRootState = ReturnType<typeof store.getState>;
