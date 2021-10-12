import React, { useEffect, useCallback, useState } from 'react'
import classes from './FilterTask.module.css'
import { useDispatch, useSelector} from 'react-redux';

import { getTasksAction } from '../../store/tasks-slice';



const FilterTask = () => {
  const [title, setTtile] = useState('');
  const [status, setStatus] = useState('')
  const [page, setPage] = useState(1)
  const [middle, setMiddle] = useState(3)
  const [limit, setLimit] = useState('')
  // const [total, setTotal] = useState(0)

  const dispatch = useDispatch();

  const getTasks = useCallback(() => {
    dispatch(getTasksAction(`?title=${title}&status=${status}&page=${page}&limit=${limit}`))
  }, [title, status, page, limit, dispatch] );


  useEffect(() => {
    getTasks()
  }, [title, getTasks]);

  
  const handleChangeTitle = e => {
    setTtile(e.target.value);
  };

  const handleChangeStatus = e => {
    setStatus(e.target.value);
  };


  // Pagination :


  const handleChangeLimit = e => {
    setLimit(e.target.value);
    setMiddle(3)
    setPage(1)
  };

  const total = useSelector(state => state.tasks.total);
  const totalPages = Math.ceil(total / limit)

  const maxMiddle = (Math.ceil(totalPages / 5 - 1) * 5) + 3

  function goToFirstPage() {
    setMiddle(3);
    setPage(1);
  }

  function goToPreviousPage() {
    setMiddle((middle) => Math.max(3, middle - 5));
  }

  function goToNextPage() {
    setMiddle((middle) => Math.min(maxMiddle, middle + 5))
 
  }

  function goToLastPage() {
    setMiddle(maxMiddle);
    setPage(totalPages);
  }

  function changePage(event) {
    const pageNumber = Number(event.target.textContent);
    setPage(pageNumber);
  }

  const getPaginationGroup = useCallback(() => {
    const start = Math.max(1, middle - 2)
    const end = Math.min(middle + 2, totalPages)
    let list = [];
    for (let i = start; i <= end; i++) {
      list.push(i);
    }
    return list
  }, [middle, totalPages]);


  return (
    <div>
    <form className={classes.Task_search}>
        {/* <h1 className={classes.Top_header}>My Todos</h1> */}
        <select className={classes.selectForm} value={status} onChange={handleChangeStatus} >
            <option value="">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
        </select>

        
        <input className={classes.TaskSearchInput} onChange={handleChangeTitle} value={title} type='text' id='task' placeholder="Search" />  

        <span className="icon"><i className="fa fa-search"></i></span>

        {/* <input className={classes.Page_limit} onChange={handleChangePage} value={page} type='text' id='page' placeholder="Page" />   */}
        <input className={classes.Page_limit} onChange={handleChangeLimit} value={limit} type='text' id='limit' placeholder="Limit" />  
              
    </form>
    
    
     {/* pagination */}

     {limit && (
       <div className={classes.pagination}>

       {/* first page button */}
       { middle > 3 && (
         <button
         onClick={goToFirstPage}
         className={`${classes.paginationItem} 'active' `}        >
         <span>1</span>
         </button>
       )}
 
 
       {/* previous button */}
       {middle > 3 &&(
         <button
         onClick={goToPreviousPage}
         className={`${classes.prev} ${page === 1 ? 'disabled' : ''}`}
       >
         &lt;&lt;
       </button>
       )}       
 
       {/* show page numbers */}
       {getPaginationGroup().map((item, index) => (
         <button
           key={index}
           onClick={changePage}
           className={`${classes.paginationItem} ${page === item ? 'active' : null}`}
         >
           <span>{item}</span>
         </button>
       ))}
 
       {/* next button */}

       {middle < maxMiddle && (
         <button
         onClick={goToNextPage}
         className={`${classes.next} ${page === totalPages ? 'disabled' : ''}`} >
          &gt;&gt;
       </button>
      )}
       
 
       {/* last page button */}
       { middle < totalPages && (
         <button
         onClick={goToLastPage}
         className={`${classes.paginationItem} 'active'`}        >
         <span>{totalPages}</span>
         </button>
       )}
 
     </div>
     )}

    </div>
  )
}

export default FilterTask