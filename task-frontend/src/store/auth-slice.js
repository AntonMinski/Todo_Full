import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: '',
        isLoggedIn : false
    },
    reducers: {
        setLogin: (state, action) => {
            state.token = action.payload;
            state.isLoggedIn = true;
            // console.log(state.token, action.payload, state.isLoggedIn)
        }, 
        setLogout: (state) => {
            state.token = '';
            state.isLoggedIn = false;
            // console.log(state.token, state.isLoggedIn)
        }
    }
});

export const authActions = authSlice.actions;

export default authSlice;