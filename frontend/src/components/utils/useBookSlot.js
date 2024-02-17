import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { bookingFailure, bookingStart, bookingSuccess } from "../../redux/slices/ticketSlice.js";
const useBookSlot = () => {
    const [errMessage, setErrMessage] = useState('');
    const dispatch = useDispatch();

    const bookSlotForUser = async (bookingData) => {
        dispatch(bookingStart())
        try {
            const response = await axios.post('http://localhost:5000/api/parking/book-slot', JSON.stringify(bookingData), { headers: { 'Content-Type': 'application/json' } })
            console.log(response.data);
            dispatch(bookingSuccess(response?.data?.data));
            return response.data
        } catch (error) {
            setErrMessage(error?.response?.data?.message);
            dispatch(error?.response?.data?.message);
            setTimeout(() => {
                setErrMessage('')
            }, 2000);
        }
    }
    return {
        bookSlotForUser,
        errMessage
    }
}

export default useBookSlot