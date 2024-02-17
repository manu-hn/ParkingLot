import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    bookedSlotTicket: [],
    error: null,
    loading: false,
}

const ticketSlice = createSlice({
    name: 'ticket',
    initialState,
    reducers: {
        bookingStart: (state) => {
            state.loading = true
        },
        bookingSuccess: (state, action) => {
            state.bookedSlotTicket = action.payload;
            state.error = null;
            state.loading = false;
        },
        bookingFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
            state.bookedSlotTicket = null;
        }
    }
});


export const { bookingFailure, bookingStart, bookingSuccess } = ticketSlice.actions;
export default ticketSlice.reducer;