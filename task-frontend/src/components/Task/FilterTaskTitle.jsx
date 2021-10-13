import React from 'react'

import SearchIcon from '@mui/icons-material/Search';


const FilterTaskTitle = ({title, setTitle}) => {

  
  const handleChangeTitle = e => {
    setTitle(e.target.value);
  };
  
  return (
    <div className="searchDivBar" >
      <div className="searchBoxBar">
        <input className="searchInputBar" onChange={handleChangeTitle} value={title} type='text' id='task' placeholder="Search..." />
        <button className="searchButtonBar" >
          <SearchIcon sx={{ fontSize: 40 }} />
        </button>
      </div>
    </div>
      
  )
}

export default FilterTaskTitle