import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
    name: 'task',
    initialState: {
        tasks: ['123'],
    },
    reducers: {
        setTasks: (state, action) => {
            state.tasks = action.payload;
        }
    }
});

export const taskActions = taskSlice.actions;

export default taskSlice;