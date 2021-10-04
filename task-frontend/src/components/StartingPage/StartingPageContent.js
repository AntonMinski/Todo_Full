import React, {useEffect, useState, useContext, useCallback} from "react";

import AuthContext from '../../store/auth-context'; 
import { GetTasks, addTask, completeTask, deleteTask } from "../../api/task.api";

import TaskItem from '../TaskItem'
import AddTask from '../AddTask'



const StartingPageContent = () => {
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  
  const [tasks, setTasks] = useState([]);
  
  useEffect(() => {
    getTasks()
  }, []);

  const getTasks = useCallback(() => {
    GetTasks(token)
    .then(response => { 
      setTasks(response.data);
    })
    .catch(err => console.log(err));
  }, []); 

 
  const handleSaveTodo = (e, formData) => {
    e.preventDefault()
    addTask(formData, token)
    .then(({ status, data }) => {
     if (status !== 201) {
       throw new Error('Error! Task not saved')
     }
     getTasks();
   })
   .catch((err) => console.log(err))
 }

 const hadleComplteteTask = (id) => {
  completeTask(id, token)
  .then(({ status, data }) => {
      if (status !== 200) {
        throw new Error('Error! Todo not updated')
      }
      getTasks();
    })
    .catch((err) => console.log(err))
}

const handleDeleteTask = (id) => {
  deleteTask(id, token)
  .then(({ status, data }) => {
      if (status !== 200) {
        throw new Error('Error! Todo not deleted')
      }
      getTasks();
    })
    .catch((err) => console.log(err))
}

  return (
    <div className='App'>
      <h1>My Todos</h1>
      <AddTask saveTodo={handleSaveTodo} />
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          updateTodo={hadleComplteteTask}
          deleteTodo={handleDeleteTask}
          todo={task}
        />
      ))}
    </div>
  )

};

export default StartingPageContent;





