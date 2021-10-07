import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { GetTasks, addTask, completeTask, deleteTask } from '../api/task.api';

export const getTaskAction = createAsyncThunk('task/getTaskAction', async (searchTerm) => {
    return GetTasks(searchTerm).then(response => response.data)
})

const taskSlice = createSlice({
    name: 'task',
    initialState: {
        tasks: [''],
    },
    extraReducers: {
        [getTaskAction.fulfilled]: (state, action) => {
            state.tasks = action.payload;
        }
    },

    reducers: {
        setTasks: (state, action) => {
            state.tasks = action.payload;
        }
    }
});

// export const GetTaskAction = (searchTerm) => {

//     return async (dispatch) => {

    
//     GetTasks(searchTerm)
//     .then(response => { 
//         // setTasks(response.data);
//         console.log('response', response)
//         dispatch(taskSlice.setTasks(response.data));
//       })
//       .catch(err => console.log(err));
//     // return async (dispatch) => {  
//     }

// }


export const taskActions = taskSlice.actions;

export default taskSlice;