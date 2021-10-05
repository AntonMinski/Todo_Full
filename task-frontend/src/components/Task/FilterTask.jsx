import React, { useEffect } from 'react'


const FilterTask = ({ tasks, setSearchResults }) => {
//   const [formData, setFormData] = useState()

//   const handleForm = (e) => {
//     setFormData({
//       ...formData,
//       [e.currentTarget.id]: e.currentTarget.value,
//     })
//   }

  const [searchTerm, setSearchTerm] = React.useState('');
//   const [searchResults, setSearchResults] = React.useState([]);

  const handleChange = e => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const results = tasks.filter(task =>
    task.task.toLowerCase().includes(searchTerm)
    );
    setSearchResults(results);
  }, [searchTerm]);

  return (
    <div className='Form'>
        <div>
          {/* <label htmlFor='task'>Find Task</label> */}
          <input onChange={handleChange} value={searchTerm} type='text' id='task' placeholder="Search" />
        </div>
    </div>
  )
}

export default FilterTask