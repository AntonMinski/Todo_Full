import React, { useEffect, useCallback, useState } from 'react'
import classes from './FilterTask.module.css'
import { useDispatch} from 'react-redux';

import { getTasksAction } from '../../store/tasks-slice';



const FilterTask = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const getTasks = useCallback(() => {
    dispatch(getTasksAction(searchTerm))
  }, [searchTerm, dispatch] );


  useEffect(() => {
    getTasks()
  }, [searchTerm, getTasks]);

  
  const handleChange = e => {
    setSearchTerm(e.target.value);
  };


  return (
    <form className={classes.Task_search}>
        <h1 className={classes.Top_header}>My Todos</h1>
        <input onChange={handleChange} value={searchTerm} type='text' id='task' placeholder="Search" />        
    </form>
  )
}

export default FilterTask