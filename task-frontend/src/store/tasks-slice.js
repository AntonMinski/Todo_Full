import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { GetTasks, addTask, completeTask, deleteTask } from '../api/task.api';

export const addTaskAction = createAsyncThunk('tasks/addTaskAction', async ({e, formData}) => {
    e.preventDefault()
    const response = await addTask(formData)
    return response.data
 });
 

export const getTasksAction = createAsyncThunk('tasks/getTaskAction', async (searchTerm) => {
    return GetTasks(searchTerm).then(response => response.data)
});

export  const completeTaskAction = createAsyncThunk('tasks/completeTaskAction', async ({id}) => {
    const response = await completeTask(id)
    return response.data
  });

  export  const deleteTaskAction = createAsyncThunk('tasks/deleteTaskAction', async ({id}) => {
    const response = await deleteTask(id)
    return {response, id}
  });




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

    reducers: {
        setTasks: (state, action) => {
            state.tasks = action.payload;
        }
    }
});

export const tasksActions = tasksSlice.actions;

export default tasksSlice;