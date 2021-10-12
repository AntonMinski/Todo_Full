import React, { useCallback} from 'react'
import { useSelector} from 'react-redux';

import classes from './_Pagination.module.scss'




const PaginationTask = ({page, setPage, limit, middle, setMiddle}) => {
 
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

      {limit && (

        <div className={classes.pagination}>

          {/* first page button */}
          {middle > 3 && (
            <button
              onClick={goToFirstPage}
              className={`${classes.paginationItem} 'active'`}        >
              <span>1</span>
            </button>
          )}


          {/* previous button */}
          {middle > 3 && (
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
              className={`${(page === item) ? classes.paginationItemActive : classes.paginationItem}`}
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
          {middle < totalPages && (
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