import React, { useEffect, useCallback, useState } from 'react'
import classes from './_FilterTask.module.scss'
import { useDispatch} from 'react-redux';

import { getTasksAction } from '../../store/tasks-slice';

import PaginationTask from './Pagination';



const FilterTask = () => {
  const [title, setTtile] = useState('');
  const [status, setStatus] = useState('')
  const [page, setPage] = useState(1)
  const [middle, setMiddle] = useState(3)
  const [limit, setLimit] = useState('')
  // const [total, setTotal] = useState(0)

  const dispatch = useDispatch();

  const getTasks = useCallback(() => {
    dispatch(getTasksAction(`?title=${title}&status=${status}&page=${page}&limit=${limit}`))
  }, [title, status, page, limit, dispatch] );


  useEffect(() => {
    getTasks()
  }, [getTasks]);

  
  const handleChangeTitle = e => {
    setTtile(e.target.value);
  };

  const handleChangeStatus = e => {
    setStatus(e.target.value);
  };

  // Pagination :

  const handleChangeLimit = e => {
    setLimit(e.target.value);
    setMiddle(3)
    setPage(1)
  };

  
  return (
    <div>
    <form className={classes.Task_search}>
        {/* <h1 className={classes.Top_header}>My Todos</h1> */}
        <select className={classes.selectForm} value={status} onChange={handleChangeStatus} >
            <option value="">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
        </select>

        
        <input className={classes.TaskSearchInput} onChange={handleChangeTitle} value={title} type='text' id='task' placeholder="Search..." />  

        <span className="icon"><i className="fa fa-search"></i></span>

        {/* <input className={classes.Page_limit} onChange={handleChangePage} value={page} type='text' id='page' placeholder="Page" />   */}
        {/* <input className={classes.Page_limit} onChange={handleChangeLimit} value={limit} type='text' id='limit' placeholder="Limit" />   */}

        <select className={classes.selectLimit} value={limit} onChange={handleChangeLimit} >
            <option value="">All</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="5">5</option>
            <option value="10">10</option>
        </select>
              
    </form>
    
    
     {/* pagination */}

      <PaginationTask page={page} setPage={setPage} limit={limit} middle={middle} setMiddle={setMiddle} />

    </div>
  )
}

export default FilterTask