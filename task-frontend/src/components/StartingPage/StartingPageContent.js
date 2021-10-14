import { useState, useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import TaskItem from '../Task/TaskItem'
import AddTask from '../Task/AddTask'
import FilterTask from "../Task/FilterTask";
import FilterTaskStatus from "../Task/FilterTaskStatus";
import FilterTaskTitle from '../Task/FilterTaskTitle';
import { getTasksAction } from '../../store/tasks-slice';



const StartingPageContent = () => {
  const dispatch = useDispatch();
  let [status, setStatus] = useState('')
  const [title, setTitle] = useState('');

  const getTasks = useCallback(() => {
    dispatch(getTasksAction())
  }, [dispatch] );

  useEffect(() => {
    getTasks()
  }, [getTasks, ]);



  const storeTasks = useSelector(state => state.tasks.tasks);
   
  return (
    <div className='AppBlock'>

      <FilterTaskStatus status={status} setStatus={setStatus} />

      <div className='App'>
        <h1>My Todos</h1>
        <div className="inputs">
         <AddTask /> <FilterTaskTitle title={title} setTitle={setTitle} />
        </div>
        <FilterTask title={title} setTitle={setTitle} status={status} setStatus={setStatus} />
        {storeTasks.map((task) => (
          <TaskItem
            key={task.id}
            todo={task}
          />))}
      </div>
    </div>
  )
};

export default StartingPageContent;





