import { createSlice } from "@reduxjs/toolkit";

const initialToken = localStorage.getItem('token')
  

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: initialToken ? initialToken : '',
        isLoggedIn: false ? initialToken : false
    },
    reducers: {
        setLogin: (state, action) => {
            state.token = action.payload;
            state.isLoggedIn = true;
            localStorage.setItem('token', action.payload)
            // console.log(state.token, action.payload, state.isLoggedIn)
        }, 
        setLogout: (state) => {
            state.token = '';
            state.isLoggedIn = false;
            localStorage.removeItem('token')
            // console.log(state.token, state.isLoggedIn)
        }
    }
});

export const authActions = authSlice.actions;

export default authSlice;