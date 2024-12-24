import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import {ILoginCredentials, ILoginResponse} from '../../types/models/auth.model';
import {loginUserAPI} from './authAPI';
import getDecodedJWT, {DecodedJWTUser} from '../../util/getDecodedJWT.ts';

export interface AuthState {
    user: DecodedJWTUser | null;
    status: 'idle' | 'loading' | 'failed';
}

const initialState: AuthState = {
    user: getDecodedJWT(),
    status: 'idle',
};

export const loginAsync = createAsyncThunk<ILoginResponse, ILoginCredentials>(
    'auth/login',
    async (credentials: ILoginCredentials, {rejectWithValue}) => {
        try {
            return await loginUserAPI(credentials);
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    },
);

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
                if (!action.payload) {
                    state.user = null;
                    Cookies.remove('jwt');
                    return;
                }

                Cookies.set('jwt', action.payload.authentication, {secure: true});
                const decodedUser = getDecodedJWT();
                state.user = decodedUser ? decodedUser : null;

                if (!decodedUser) {
                    Cookies.remove('jwt'); // Remove invalid token
                }
            })
            .addCase(loginAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.user = null; // Ensure user is cleared on login failure
                console.error('Login failed:', action.payload); // Log error if needed
            });
    },
});

export const {signout} = authSlice.actions;
export default authSlice.reducer;
