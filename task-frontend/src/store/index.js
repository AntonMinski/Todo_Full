import { configureStore } from '@reduxjs/toolkit'
import authSlice from './auth-slice'
import taskSlice from './task-slice';
import errorSlice from './error-slice';

const store =  configureStore({  
    reducer: {
        auth: authSlice.reducer,
        task: taskSlice.reducer,
        error: errorSlice.reducer,
         },
})

export default store;