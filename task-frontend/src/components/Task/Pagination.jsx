import React, { useCallback, useState, useEffect} from 'react'
import { useSelector} from 'react-redux';
import { useDispatch} from 'react-redux';

import classes from './_Pagination.module.scss'
import { tasksActions, getTasksAction } from '../../store/tasks-slice';



const PaginationTask = () => {

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState('')

  const dispatch = useDispatch();

  
  const [currentMin, setCurrentMin] = useState(1)
  const total = useSelector(state => state.tasks.total);
  const totalPages = Math.ceil(total / limit)

  const goToFirstPage = useCallback(() => {
    setCurrentMin(1);
    setPage(1);
  }, [setPage])

  const goToPreviousBlock = useCallback(() => {
    setCurrentMin((currentMin) => Math.max(1, currentMin - 5));
  }, [])

  const goToNextPageBlock = useCallback(() => {
    setCurrentMin((currentMin) => Math.min(totalPages, currentMin + 5))
   }, [totalPages])

  const goToLastPage = useCallback(() => {
    setCurrentMin(totalPages);
    setPage(totalPages);
  }, [setPage, totalPages])

  const changePage = useCallback((event) => {
    const pageNumber = Number(event.target.textContent);
    setPage(pageNumber);
    dispatch(tasksActions.setStatePage(pageNumber))
  }, [setPage, dispatch])

  const getPaginationGroup = useCallback(() => {
    const start = Math.max(1, currentMin)
    const end = Math.min(currentMin + 4, totalPages)
    let list = [];
    for (let i = start; i <= end; i++) {
      list.push(i);
    }
    return list
  }, [currentMin, totalPages]);

  const handleChangeLimit = useCallback((e) =>  {
    setLimit(e.target.value);
    setCurrentMin(1)
    setPage(1)
    dispatch(tasksActions.setStateLimit(e.target.value))
  }, [setLimit, setPage, dispatch])

  const getTasks = useCallback(() => {
    dispatch(getTasksAction())
  }, [dispatch] );

  useEffect(() => {
    getTasks()
  }, [page, limit, getTasks]);

  
  return (


    <div className="limitBlock" >

        <label className='selectLabel' htmlFor="selectLimit">on page</label>
        <select className="selectLimit" value={limit} onChange={handleChangeLimit}>
        
          <option value="">--</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="5">5</option>
          <option value="10">10</option>
        </select>

         
      {limit && (

        <div className={classes.pagination}>

          {/* first page button */}
          {currentMin > 1 && (
            <button
              onClick={goToFirstPage}
              className={`${classes.paginationItem} 'active'`}        >
              <span>1</span>
            </button>
          )}


          {/* previous button */}
          {currentMin > 1 && (
            <button
              onClick={goToPreviousBlock}
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
              className={`${(page === item) ? classes.paginationItemActive : classes.paginationItem}`}
            >
              <span>{item}</span>
            </button>
          ))}

          {/* next button */}

          {currentMin + 5 < totalPages && (
            <button
              onClick={goToNextPageBlock}
              className={`${classes.next} ${page === totalPages ? 'disabled' : ''}`} >
              &gt;&gt;
            </button>
          )}


          {/* last page button */}
          {currentMin + 5  < totalPages && (
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
   
export default PaginationTask