import React, {useCallback} from "react";
import {  useDispatch} from 'react-redux';

import { completeTaskAction, deleteTaskAction } from '../../store/tasks-slice';
// import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';


const TaskItem = ({ todo }) => {
  const dispatch = useDispatch();

  const updateTask = useCallback((id) => {
    dispatch(completeTaskAction({id}))
  
  }, [dispatch]);
  
  const deleteTask = useCallback((id) => {
    dispatch(deleteTaskAction({id}))
    }, [dispatch]);



  const checkTodo = todo.isActive ? `` : `line-through`
  return (
    <div className='Card'>
      <div className='Card--text'>
        <h1 className={checkTodo}>{todo.task}</h1>
        {/* <span className={checkTodo}>{todo.description}</span> */}
      </div>
      <div className='Card--button'>
        <button
          onClick={() => updateTask(todo.id)}
          className={(!todo.isActive) ? `hide-button` : 'Card--button__done'}
        >
          Complete
        </button>
        <button
          onClick={() => deleteTask(todo.id)}
          className='Card--button__delete'
        > 
          Delete
        </button>
      </div>
    </div>
  )
}

export default TaskItem