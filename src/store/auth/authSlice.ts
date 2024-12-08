import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { ILoginCredentials } from '../../types/models/auth.model';
import { loginUserAPI } from './authAPI';
import getDecodedJWT, { DecodedJWTUser } from '../../util/getDecodedJWT.ts';

export interface AuthState {
  user: DecodedJWTUser | null;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: AuthState = {
  user: getDecodedJWT(),
  status: 'idle',
};

export const loginAsync = createAsyncThunk('auth/login', async (credentials: ILoginCredentials) => {
  return await loginUserAPI(credentials);
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signout: (state) => {
      state.user = null;
      Cookies.remove('jwt');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = getDecodedJWT(); // Decode the JWT after login
        Cookies.set('jwt', action.payload.authentication, { secure: true });
      })
      .addCase(loginAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { signout } = authSlice.actions;
export default authSlice.reducer;
