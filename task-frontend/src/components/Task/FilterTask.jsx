import React, { useEffect, useCallback, useState } from 'react'
import { useDispatch} from 'react-redux';

import { getTasksAction } from '../../store/tasks-slice';
import PaginationTask from './Pagination';




const FilterTask = ({title, setTitle, status, setStatus}) => {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState('')

  const dispatch = useDispatch();

  const getTasks = useCallback(() => {
    dispatch(getTasksAction(`?title=${title}&status=${status}&page=${page}&limit=${limit}`))
  }, [title, status, page, limit, dispatch] );

  useEffect(() => {
    getTasks()
  }, [getTasks]);

  
  return (
    <div>
        <PaginationTask page={page} setPage={setPage} limit={limit} setLimit={setLimit} />
    </div>
  )
}

export default FilterTask