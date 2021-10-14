import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { GetTasks, addTask, completeTask, deleteTask } from '../api/task.api';
import {errorActions} from './error-slice'



export const addTaskAction = createAsyncThunk('tasks/addTaskAction', async ({e, formData}, {rejectWithValue, dispatch}) => {
    e.preventDefault()

    const response = await addTask(formData)

    if (!response.message || response.message !== 'task created') {
        dispatch(errorActions.setError(response));
        return rejectWithValue(response.message);
    } else {
        return response.data
    }
   
 });
 

export const getTasksAction = createAsyncThunk('tasks/getTaskAction', async (searchQuery, {rejectWithValue, dispatch}) => {

    const response = await GetTasks(searchQuery)

    if (!response.message) {
        dispatch(errorActions.setError(response));
        return rejectWithValue(response);
    } 

    return response

});

export const getFilteredTasksAction = createAsyncThunk('tasks/getFilteredTaskAction', async (searchQuery, {rejectWithValue, dispatch}) => {

    const {title, status, page, limit} = searchQuery

    const response = await GetTasks(`?title=${title}&status=${status}&page=${page}&limit=${limit}`)

    if (!response.message) {
        dispatch(errorActions.setError(response));
        return rejectWithValue(response);
    } 

    return response

});

export  const completeTaskAction = createAsyncThunk('tasks/completeTaskAction', async ({id},  {rejectWithValue, dispatch}) => {
    const response = await completeTask(id)

    if (!response.message || response.message !== 'Status updated') {
        // dispatch(errorActions.setError(response));
        return rejectWithValue(response.message);

    } else {
        return response.data
    }
  });

  export  const deleteTaskAction = createAsyncThunk('tasks/deleteTaskAction', async ({id},  {rejectWithValue, dispatch}) => {
    const response = await deleteTask(id)

    if (!response.message || response.message !== 'Task deleted') {
        dispatch(errorActions.setError(response));
        return rejectWithValue(response.message);
    }
    
    return {response, id}
  });




const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: [],
        total: null,
        error: '',
        filterTitle: '',
        filterStatus: '',
        filterPage: '',
        filterLimit: ''
    },

    extraReducers: {
        [getTasksAction.fulfilled]: (state, {payload}) => {
            state.tasks = payload.data;
            state.total = payload.total
        },

        [getTasksAction.rejected]: (state, {payload, meta, error}) => {
            // console.log(payload, meta, error)
            // errorActions.setError({payload})
            // state.error = payload.message
            // errorActions.setError(action.payload.error)
            // console.log(state, action.payload)
        },

        [addTaskAction.fulfilled]: (state, action) => {
            state.tasks.push(action.payload)
        },
        [addTaskAction.rejected]: (state, {payload, meta, error}) => {
            // console.log(payload, meta, error)
            state.error = payload
        },

        


        [completeTaskAction.fulfilled]: (state, action) => {
            const index = state.tasks.findIndex(task => task.id === action.payload.id);
            state.tasks[index] = {
            ...state.tasks[index],
            ...action.payload,
            };
        },
        [completeTaskAction.rejected]: (state, action) => {
            console.log(state, action.payload)
        },

        [deleteTaskAction.fulfilled]: (state, action) => {
            const index = state.tasks.findIndex(({ id }) => id === action.payload.id);
            state.tasks.splice(index, 1);
        },

        [deleteTaskAction.rejected]: (state, action) => {
            console.log(state, action.payload)
        },
        
    },

    // reducers: {
    //     setTasks: (state, action) => {
    //         state.tasks = action.payload;
    //     }
    // }
});

export const tasksActions = tasksSlice.actions;

export default tasksSlice;