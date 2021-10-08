import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { GetTasks, addTask, completeTask, deleteTask } from '../api/task.api';

export const addTaskAction = createAsyncThunk('tasks/addTaskAction', async ({e, formData}) => {
    e.preventDefault()
    console.log('formData', formData)
    const response = await addTask(formData)
//     .then(({ status, data }) => {
//      if (status !== 201) {
//        throw new Error('Error! Task not saved')
//      }
//      getTasks();
//    })
//    .catch((err) => console.log(err))
    return response.data.data
 })
 

export const getTasksAction = createAsyncThunk('tasks/getTaskAction', async (searchTerm) => {
    return GetTasks(searchTerm).then(response => response.data)
})



const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: [],
    },
    extraReducers: {
        [addTaskAction.fulfilled]: (state, action) => {
            state.tasks.push(action.payload)
        },
        [addTaskAction.rejected]: (state, action) => {
            console.log(state, action.payload)
        },

        [getTasksAction.fulfilled]: (state, action) => {
            state.tasks = action.payload;
        },
        
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


export const tasksActions = tasksSlice.actions;

export default tasksSlice;