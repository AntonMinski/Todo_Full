import React, { useState, useCallback } from 'react'
import {  useDispatch} from 'react-redux';
import {  addTaskAction } from '../../store/tasks-slice';

import PlaylistAddOutlinedIcon from '@mui/icons-material/PlaylistAddOutlined';



const AddTask = () => {
  const [formData, setFormData] = useState()
  const [title, setTitle] = useState('')
  const dispatch = useDispatch();


  const saveTodo = useCallback((e, formData) => {
    dispatch(addTaskAction({ e, formData }))
  }, [dispatch]);

  const handleForm = useCallback((e) => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    })
    setTitle(e.currentTarget.value)
  }, [formData])

  return (
    <form className="Task_add" onSubmit={(e) => saveTodo(e, formData)}>
      <div className="searchDiv" >
        <div className="searchBox">
          <input className={`searchInput ${ !!title ? 'withText' : ''}`} onChange={handleForm} value={title} type='text' id='task' placeholder="Add Task..." />
          <button className="addButton" > 
            <PlaylistAddOutlinedIcon sx={{ fontSize: 40 }} />
          </button>
        </div>
      </div>
    </form>
  )
}

export default AddTask
