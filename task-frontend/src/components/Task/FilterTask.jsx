import React, { useEffect, useCallback, useState } from 'react'
import classes from './FilterTask.module.css'
import { useDispatch} from 'react-redux';

import { getTasksAction } from '../../store/tasks-slice';

{/* <script src="https://kit.fontawesome.com/77d889ab59.js" crossorigin="anonymous"></script> */}



const FilterTask = () => {
  const [title, setTtile] = useState('');
  const [status, setStatus] = useState('')

  const dispatch = useDispatch();

  const getTasks = useCallback(() => {
    dispatch(getTasksAction(`?title=${title}&status=${status}`))
  }, [title, status, dispatch] );


  useEffect(() => {
    getTasks()
  }, [title, getTasks]);

  
  const handleChangeTitle = e => {
    setTtile(e.target.value);
  };

  const handleChangeStatus = e => {
    setStatus(e.target.value);
  };


  return (
    <form className={classes.Task_search}>
        {/* <h1 className={classes.Top_header}>My Todos</h1> */}
        <select className={classes.selectForm} value={status} onChange={handleChangeStatus}>
            <option selected value="">All</option>
            <option selected value="active">Active</option>
            <option value="completed">Completed</option>
        </select>

        
        <input onChange={handleChangeTitle} value={title} type='text' id='task' placeholder="Search" />  

        <span class="icon"><i class="fa fa-search"></i></span>
              
    </form>
  )
}

export default FilterTask