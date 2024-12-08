import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';

export const rootReducer = {
  auth: authReducer,
};

export const store = configureStore({
  reducer: rootReducer,
});

export type TAppDispatch = typeof store.dispatch;
export type TRootState = ReturnType<typeof store.getState>;
