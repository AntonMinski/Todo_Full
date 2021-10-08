import { createSlice } from "@reduxjs/toolkit";


// import { api } from '../api/axios.api';




const errorSlice = createSlice({
    name: 'error',
    initialState: {
        notification: null
    },
    reducers: {
        setError: (state, {payload}) => {
            state.notification = {
                title: payload.error,
                status: payload.statusCode,
                message: payload.message
            };
            // useToasts(payload.error, { appearance: 'error' })
            // console.log(notification)
        }, 
        clearError: (state) => {
            state.notification = null;
            // console.log(state.token, state.isLoggedIn)
        }
    }
});

export const errorActions = errorSlice.actions;

export default errorSlice;