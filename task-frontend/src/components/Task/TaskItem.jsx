
import React from 'react'


const TaskItem = ({ todo, updateTodo, deleteTodo }) => {
  const checkTodo = todo.isActive ? `` : `line-through`
  return (
    <div className='Card'>
      <div className='Card--text'>
        <h1 className={checkTodo}>{todo.task}</h1>
        {/* <span className={checkTodo}>{todo.description}</span> */}
      </div>
      <div className='Card--button'>
        <button
          onClick={() => updateTodo(todo.id)}
          className={(!todo.isActive) ? `hide-button` : 'Card--button__done'}
        >
          Complete
        </button>
        <button
          onClick={() => deleteTodo(todo.id)}
          className='Card--button__delete'
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default TaskItem