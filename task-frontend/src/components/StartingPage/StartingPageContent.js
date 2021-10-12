// import React, {useEffect, useCallback} from "react";
import { useSelector } from 'react-redux';
// import {  useDispatch} from 'react-redux';

import TaskItem from '../Task/TaskItem'
import AddTask from '../Task/AddTask'
import FilterTask from "../Task/FilterTask";

import classes from './StartingPageContent.module.css'
// import { getTasksAction } from '../../store/tasks-slice';



const StartingPageContent = () => {

  // const [tasks, setTasks] = useState([]);
      
  // const storeTasks = useSelector(state => state.tasks.tasks);
  // const dispatch = useDispatch();

  // const getTasks = useCallback(() => {
  //   dispatch(getTasksAction(''))
  // }, [dispatch] );

 
  // useEffect(() => {
  //   getTasks()
  // }, [getTasks]);

  const storeTasks = useSelector(state => state.tasks.tasks);
   
  return (
    <div className='App'>
      <h1>My Todos</h1>
        
      <AddTask />
      <FilterTask />
      {storeTasks.map((task) => (
        <TaskItem
          key={task.id}
          todo={task}
        />
      ))}
     
    </div>
  )
};

export default StartingPageContent;





