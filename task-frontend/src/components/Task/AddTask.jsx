import React, { useState, useCallback } from 'react'
import {  useDispatch} from 'react-redux';
import {  addTaskAction } from '../../store/tasks-slice';

import PlaylistAddOutlinedIcon from '@mui/icons-material/PlaylistAddOutlined';



const AddTask = () => {
  const [formData, setFormData] = useState()
  const dispatch = useDispatch();


  const saveTodo = useCallback((e, formData) => {
    dispatch(addTaskAction({ e, formData }))
  }, [dispatch]);

  const handleForm = (e) => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    })
  }

  return (
    <form className="Task_add" onSubmit={(e) => saveTodo(e, formData)}>
      {/* <div>
        <div>
          <label htmlFor='task'>Task Name</label>
          <input onChange={handleForm} type='text' id='task' />
        </div>
      </div> */}
      <div className="searchDiv" >
        <div className="searchBox">
          <input className="searchInput" onChange={handleForm} type='text' id='task' placeholder="Add Task..." />
          <button className="addButton" > 
            <PlaylistAddOutlinedIcon sx={{ fontSize: 40 }} />
          </button>
        </div>
      </div>
      {/* <button disabled={formData === undefined ? true: false} >Add Task</button> */}
    </form>
  )
}

export default AddTask
