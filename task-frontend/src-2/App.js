import React, {useEffect, useState} from "react";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";
import axios from 'axios';


const baseUrl = 'http://192.168.0.1:3000/login';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjMzMTEyNDk3LCJleHAiOjE2MzMxOTg4OTd9.Bi6Ldt289mkaVfuTjIuh-dHkc_4nyFf0ki4PYkwN_44';
const config = {
  url: baseUrl,
  method: "GET",
     headers: {
      'content-type': "application/json",
      // 'X-CSRFTOKEN': CSRF_TOKEN,
      // Authorization: `Bearer ${token}`
  },
};


function App(props) {
  const taskList = props.tasks.map(task => (
    <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
      />
    )
  );

  const [task, setTask] = useState([]);

  useEffect(() => {
    axios.get(baseUrl).then((res) => {
      console.log(res.data)
      setTask(res.data);
    }, []).catch((err) => console.log(err));
  });


  return(
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
        {task}
      <Form />
      <div className="filters btn-group stack-exception">
        <FilterButton />
        <FilterButton />
        <FilterButton />
      </div>
      <h2 id="list-heading">3 tasks remaining</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
        {/* {userData} */}
        {/* {data} */}
      </ul>
    </div>
  );
}

export default App;

