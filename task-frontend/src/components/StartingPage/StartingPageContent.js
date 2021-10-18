import { useState, useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import TaskItem from '../Task/TaskItem'
import AddTask from '../Task/AddTask'
import PaginationTask from "../Task/Pagination";

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

  const date = new Date();
  const dayNumber = date.getDate()
  // const monthLabel = date.getMonth()

  const day = new Array(7);
  day[0] = "Sunday";
  day[1] = "Monday";
  day[2] = "Tuesday";
  day[3] = "Wednesday";
  day[4] = "Thursday";
  day[5] = "Friday";
  day[6] = "Saturday";

  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dayName = dayNames[date.getDay(0)]
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const monthLabel = monthNames[date.getMonth()]

  // const today = day[date.getDay()];


  const storeTasks = useSelector(state => state.tasks.tasks);
   
  return (
    <div className='AppBlock'>

      <FilterTaskStatus status={status} setStatus={setStatus} />

      <div className='App'>
        <h1> &lt; {dayName} &gt; </h1>
        <h2>{dayNumber} - {monthLabel}</h2>
        <div className="inputs">
         <AddTask /> <FilterTaskTitle title={title} setTitle={setTitle} />
        </div>
        <div>
        <PaginationTask />
        </div>
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





