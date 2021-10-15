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

        <div className={`itemBlock ${status === '' ? 'active' : ''}`} onClick={() => handleChangeStatus('')}  >
          <CallSplitIcon sx={{ fontSize: 40 }} className={`${status === '' ? 'statusIcon' : ''}`} />
          <span>All</span>
        </div>

        <div className={`itemBlock ${status === 'active' ? 'active' : ''}`} value='active' onClick={() => handleChangeStatus('active')}  >
            <PlayCircleOutlineIcon sx={{ fontSize: 40 }} className={`${status === 'active' ? 'statusIcon' : ''}`} />
            <span>Active</span>
        </div>

        <div className={`itemBlock ${status === 'completed' ? 'active' : ''}`} value='completed' onClick={() => handleChangeStatus('completed')} >
            <DoneAllIcon sx={{ fontSize: 40 }} className={`${status === 'completed' ? 'statusIcon' : ''}`} />
            <span>Completed</span>
        </div>
      
      </div>

  )
}

export default FilterTaskStatus;