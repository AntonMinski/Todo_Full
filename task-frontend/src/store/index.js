import { configureStore } from '@reduxjs/toolkit'
import authSlice from './auth-slice'
import tasksSlice from './tasks-slice';
import errorSlice from './error-slice';

const store =  configureStore({  
    reducer: {
        auth: authSlice.reducer,
        tasks: tasksSlice.reducer,
        error: errorSlice.reducer,
         },
})

export default store;