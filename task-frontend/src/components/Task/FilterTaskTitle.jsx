import React, {useCallback, useEffect, useState} from 'react'
import { useDispatch} from 'react-redux';

import SearchIcon from '@mui/icons-material/Search';
import { tasksActions, getTasksAction } from '../../store/tasks-slice';



const FilterTaskTitle = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('')
  
  const handleChangeTitle = useCallback(e => {
    e.preventDefault();
    setTitle(e.target.value);
    dispatch(tasksActions.setStateTitle(e.target.value))
  }, [setTitle, dispatch]);

  const getTasks = useCallback(() => {
    dispatch(getTasksAction())
  }, [dispatch] );

  useEffect(() => {
    getTasks()
  }, [title, getTasks]);


  
  return (
    <div className="searchDivBar" >
      <div className="searchBoxBar">
        <input className={`searchInputBar ${(title.length > 0) ? "withText" : ""}`} onChange={handleChangeTitle} value={title} type='text' id='title' 
        placeholder="Search..." />
        <button className="searchButtonBar" >
          <SearchIcon sx={{ fontSize: 40 }} />
        </button>
      </div>
    </div>
      
  )
}

export default FilterTaskTitle