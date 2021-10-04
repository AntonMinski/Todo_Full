import React, { useState } from 'react'

const AddTask = ({ saveTodo }) => {
  const [formData, setFormData] = useState()

  const handleForm = (e) => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    })
  }

  return (
    <form className='Form' onSubmit={(e) => saveTodo(e, formData)}>
      <div>
        <div>
          <label htmlFor='task'>Task Name</label>
          <input onChange={handleForm} type='text' id='task' />
        </div>
      </div>
      <button disabled={formData === undefined ? true: false} >Add Task</button>
    </form>
  )
}

export default AddTask