import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ILoginCredentials } from '../../types/models/auth.model';
import { loginUser, logoutUser } from './authAPI';

interface IAuthState {
  isAuthenticated: boolean;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: IAuthState = {
  isAuthenticated: false,
  status: 'idle',
};

// Async thunk for login
export const loginAsync = createAsyncThunk(
  'auth/login',
  async (credentials: ILoginCredentials, { rejectWithValue }) => {
    try {
      await loginUser(credentials);
      return true; // Assume the backend handles setting the cookie
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  },
);

// Async thunk for logout
export const logoutAsync = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    await logoutUser();
    return false; // Update isAuthenticated to false
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Logout failed');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginAsync.fulfilled, (state) => {
        state.isAuthenticated = true;
        state.status = 'idle';
      })
      .addCase(loginAsync.rejected, (state) => {
        state.isAuthenticated = false;
        state.status = 'failed';
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.status = 'idle';
      });
  },
});

export default authSlice.reducer;
