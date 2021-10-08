import React, {useEffect, useCallback} from "react";
import { useSelector, useDispatch} from 'react-redux';

import TaskItem from '../Task/TaskItem'
import AddTask from '../Task/AddTask'
import FilterTask from "../Task/FilterTask";
import { getTasksAction } from '../../store/tasks-slice';



const StartingPageContent = () => {

  // const [tasks, setTasks] = useState([]);
      
  const storeTasks = useSelector(state => state.tasks.tasks);
  const dispatch = useDispatch();

  const getTasks = useCallback(() => {
    dispatch(getTasksAction(''))
  }, [dispatch] );

 
  useEffect(() => {
    getTasks()
  }, [getTasks]);

   
  return (
    <div className='App'>
        <FilterTask />
      <AddTask />
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





