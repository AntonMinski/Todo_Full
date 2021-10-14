import React, {useCallback} from 'react'

import SearchIcon from '@mui/icons-material/Search';


const FilterTaskTitle = ({title, setTitle}) => {

  
  const handleChangeTitle = useCallback(e => {
    e.preventDefault();
    setTitle(e.target.value);
  }, [setTitle]);


  
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