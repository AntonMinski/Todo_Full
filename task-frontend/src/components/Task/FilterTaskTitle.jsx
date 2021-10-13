import React, { useEffect, useCallback, useState } from 'react'
import classes from './_FilterTask.module.scss'

import SearchIcon from '@mui/icons-material/Search';


const FilterTaskTitle = ({title, setTitle}) => {
  // const [title, setTtile] = useState('');

  
  const handleChangeTitle = e => {
    setTitle(e.target.value);
  };
  
  return (
      // <form className={classes.Task_search}>
    <div className="searchDivBar" >
      <div className="searchBoxBar">
        <input className="searchInputBar" onChange={handleChangeTitle} value={title} type='text' id='task' placeholder="Search..." />
        <button className="searchButtonBar" >
          <SearchIcon sx={{ fontSize: 40 }} />
        </button>
      </div>
    </div>

    //  </form>
      
  )
}

export default FilterTaskTitle