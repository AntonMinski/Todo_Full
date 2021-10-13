import React from 'react'


import CallSplitIcon from '@mui/icons-material/CallSplit';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import DoneAllIcon from '@mui/icons-material/DoneAll';


const FilterTaskStatus = ({status, setStatus}) => {

    function handleChangeStatus (value) {
            setStatus(value);   };
  
  return (
    <div className='leftMenu'>

        <button className="itemBlock" value='' onClick={() => handleChangeStatus('')}  >
          <CallSplitIcon sx={{ fontSize: 40 }} />
          <span>All</span>
        </button>

        <div className="itemBlock" value='active' onClick={() => handleChangeStatus('active')}  >
            <PlayCircleOutlineIcon sx={{ fontSize: 40 }} />
            <span>Active</span>
        </div>

        <div className="itemBlock" value='completed' onClick={() => handleChangeStatus('completed')} >
            <DoneAllIcon sx={{ fontSize: 40 }} />
            <span>Completed</span>
        </div>
      
      </div>

  )
}

export default FilterTaskStatus