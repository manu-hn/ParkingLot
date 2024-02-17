import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    currentUser: [],
    error: null,
    loading: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
        },
        loginSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.error = null;
            state.isAuthenticated = true;
            state.loading = false;
        },
        loginFailure: (state, action) => {
            state.currentUser = null;
            state.error = action.payload;
            state.isAuthenticated = false;
            state.loading = false;
        }
    }
})

export const { loginFailure, loginStart, loginSuccess } = userSlice.actions;

export default userSlice.reducer;