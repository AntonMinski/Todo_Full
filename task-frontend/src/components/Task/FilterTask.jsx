import React, { useEffect } from 'react'
import classes from './FilterTask.module.css'


const FilterTask = ({ tasks, setSearchResults, searchTerm, setSearchTerm }) => {
//   const [formData, setFormData] = useState()

//   const handleForm = (e) => {
//     setFormData({
//       ...formData,
//       [e.currentTarget.id]: e.currentTarget.value,
//     })
//   }

  // const [searchTerm, setSearchTerm] = React.useState('');
//   const [searchResults, setSearchResults] = React.useState([]);

  const handleChange = e => {
    setSearchTerm(e.target.value);
  };

  // useEffect(() => {
  //   const results = tasks.filter(task =>
  //   task.task.toLowerCase().includes(searchTerm)
  //   );
  //   setSearchResults(results);
  // }, [searchTerm]);

  return (
    <form className={classes.Task_search}>
        <h1 className={classes.Top_header}>My Todos</h1>
                 {/* <label htmlFor='task'>Find Task</label> */}
          
          <input onChange={handleChange} value={searchTerm} type='text' id='task' placeholder="Search" />
              
          
    </form>
  )
}

export default FilterTask