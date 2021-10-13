import React, { useEffect, useCallback, useState } from 'react'
import classes from './_FilterTask.module.scss'
import { useDispatch} from 'react-redux';

import { getTasksAction } from '../../store/tasks-slice';
import PaginationTask from './Pagination';
import SearchIcon from '@mui/icons-material/Search';



const FilterTask = ({title, setTitle, status, setStatus}) => {
  const [page, setPage] = useState(1)
  const [middle, setMiddle] = useState(3)
  const [limit, setLimit] = useState('')

  const dispatch = useDispatch();

  const getTasks = useCallback(() => {
    dispatch(getTasksAction(`?title=${title}&status=${status}&page=${page}&limit=${limit}`))
  }, [title, status, page, limit, dispatch] );

  useEffect(() => {
    getTasks()
  }, [getTasks]);

 
  // Pagination :

  const handleChangeLimit = e => {
    setLimit(e.target.value);
    setMiddle(3)
    setPage(1)
  };

  
  return (
    <div>
      {/* <form className={classes.Task_search}>

    
        <select className="selectLimit" value={limit} onChange={handleChangeLimit} >
          <option value="">On page</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="5">5</option>
          <option value="10">10</option>
        </select>

      </form> */}
      
     {/* pagination */}
      <PaginationTask page={page} setPage={setPage} limit={limit} setLimit={setLimit} middle={middle} setMiddle={setMiddle} />
    </div>
  )
}

export default FilterTask