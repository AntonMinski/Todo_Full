import React, { useCallback, useState} from 'react'
import { useSelector} from 'react-redux';

import classes from './_Pagination.module.scss'




const PaginationTask = ({page, setPage, limit, setLimit}) => {
  
  const [currentMin, setCurrentMin] = useState(1)
  const total = useSelector(state => state.tasks.total);
  const totalPages = Math.ceil(total / limit)

  function goToFirstPage() {
    setCurrentMin(1);
    setPage(1);
  }

  function goToPreviousBlock() {
    setCurrentMin((currentMin) => Math.max(1, currentMin - 5));
  }

  function goToNextPageBlock() {
    setCurrentMin((currentMin) => Math.min(totalPages, currentMin + 5))
 
  }

  function goToLastPage() {
    setCurrentMin(totalPages);
    setPage(totalPages);
  }

  function changePage(event) {
    const pageNumber = Number(event.target.textContent);
    setPage(pageNumber);
  }

  const getPaginationGroup = useCallback(() => {
    const start = Math.max(1, currentMin)
    const end = Math.min(currentMin + 4, totalPages)
    let list = [];
    for (let i = start; i <= end; i++) {
      list.push(i);
    }
    return list
  }, [currentMin, totalPages]);

  const handleChangeLimit = e => {
    setLimit(e.target.value);
    setCurrentMin(1)
    setPage(1)
  };

  
  return (


    <div className="limitBlock" >

   
        <select className="selectLimit" value={limit} onChange={handleChangeLimit} >
          <option value="">On page</option>
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