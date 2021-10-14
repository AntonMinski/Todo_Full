import api from './axios.api';



const baseUrl = `${process.env.REACT_APP_BASE_URL}/tasks`


export const GetTasks = async () => {
  try {
    // console.log(searchResults)
    const todos = await api.get( `${baseUrl}?title=&status=`);
    return todos.data
  } catch (error) {
    return error.response.data
    // throw new Error(erro)
  }
}

export const GetTasksFiltered = async (searchQuery) => {
  try {
    let {title, status, page, limit} = searchQuery
  
    const todos = await api.get( `${baseUrl}?title=${title}&status=${status}&page=${page}&limit=${limit}`);

    return todos.data
  } catch (error) {
    return error.response.data
  }
}

export const addTask = async (formData) => {
  try {
    const config = {
      method: "POST",
      url: baseUrl,
      data: { task: formData.task },
    }    
    const saveTodo = await api(config);
    return saveTodo.data
  } catch (error) {
    return error.response.data
    // throw new Error(error);
  }
}

export const completeTask = async (id) => {
  try {
    const config = {
      method: "PATCH",
      url: `${baseUrl}/${id}`,
      data: { 'isActive': false },
    }    
    const updatedTask = await api(config)
    return updatedTask.data
  } catch (error) {
    return error.response.data
    // throw new Error(error)
  }
}

export const deleteTask = async (id) => {
  try {
    const config = {
      method: "DELETE",
      url: `${baseUrl}/${id}`,
    }
    const deletedTask = await api(config);
    return deletedTask.data
  } catch (error) {
    return error.response.data
    // throw new Error(error)
  }
}