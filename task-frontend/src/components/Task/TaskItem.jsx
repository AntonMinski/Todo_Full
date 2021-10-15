import React, {useCallback} from "react";
import {  useDispatch} from 'react-redux';

import { completeTaskAction, deleteTaskAction } from '../../store/tasks-slice';
// import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import RestoreFromTrashOutlinedIcon from '@mui/icons-material/RestoreFromTrashTwoTone';
// import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
// import DoneOutlineOutlinedIcon from '@mui/icons-material/DoneOutlineOutlined';

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
      <button
        onClick={() => updateTask(todo.id)}
        className={(!todo.isActive) ? `hide-button` : 'Card--button__done'}
      >  {!todo.isActive && (
        <CheckCircleOutlinedIcon sx={{ fontSize: 35 }} />
      )}

        {!!todo.isActive && (
          <CircleOutlinedIcon sx={{ fontSize: 35 }} />
        )}
      </button>
      <div className='Card--text'>
        <h1 className={checkTodo}>{todo.task}</h1>
        {/* <span className={checkTodo}>{todo.description}</span> */}
      </div>
      <div className='Card--button'>
        
        <button
          onClick={() => deleteTask(todo.id)}
          className='Card--button__delete'
        > <RestoreFromTrashOutlinedIcon  sx={{ fontSize: 25 }} />
          
        </button>
      </div>
    </div>
  )
}

export default TaskItem