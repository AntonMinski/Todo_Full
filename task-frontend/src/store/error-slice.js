import { createSlice } from "@reduxjs/toolkit";


const errorSlice = createSlice({
    name: 'error',
    initialState: {
        notificaciton: null
    },
    reducers: {
        setError: (state, action) => {
            state.notificaciton = {
                title: action.payload.title,
                status: action.payload.status,
                message: action.payload.message,
            };
            // console.log(notification)
        }, 
        clearError: (state) => {
            state.notificaciton = null;
            // console.log(state.token, state.isLoggedIn)
        }
    }
});

export const errorActions = errorSlice.actions;

export default errorSlice;