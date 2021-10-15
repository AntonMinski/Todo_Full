import { createSlice } from "@reduxjs/toolkit";

const initialToken = localStorage.getItem('token')
const initialRefreshToken = localStorage.getItem('refreshToken')
  

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: initialToken ? initialToken : '',
        refreshToken: initialRefreshToken ? initialRefreshToken : '',
        isLoggedIn: !!initialToken 
    },
    reducers: {
        setLogin: (state, {payload}) => {
            const {access_token, refreshToken} = payload
            state.token = access_token;
            state.refreshToken = refreshToken;
            state.isLoggedIn = true;
            localStorage.setItem('token', access_token)
            localStorage.setItem('refreshToken', refreshToken)
            // console.log(state.token, action.payload, state.isLoggedIn)
        }, 
        setLogout: (state) => {
            state.token = '';
            state.isLoggedIn = false;
            localStorage.removeItem('token')
            localStorage.removeItem('refreshToken')
            // console.log(state.token, state.isLoggedIn)
        }
    }
});

export const authActions = authSlice.actions;

export default authSlice;