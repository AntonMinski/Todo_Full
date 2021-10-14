import React, {useCallback, useEffect, useState} from 'react'
import { useDispatch} from 'react-redux';

import CallSplitIcon from '@mui/icons-material/CallSplit';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { tasksActions, getTasksAction } from '../../store/tasks-slice';



const FilterTaskStatus = () => {
  const [status, setStatus] = useState('')

  const dispatch = useDispatch();

    const handleChangeStatus = useCallback((value) => {
            setStatus(value); 
            dispatch(tasksActions.setStateStatus(value))
    }, [setStatus, dispatch]);

    const getTasks = useCallback(() => {
      dispatch(getTasksAction())
    }, [dispatch] );
  
    useEffect(() => {
      getTasks()
    }, [status, getTasks]);

  
  return (
    <div className='leftMenu'>

        <button className="itemBlock" onClick={() => handleChangeStatus('')}  >
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