import api from './axios.api';



const baseUrl = `${process.env.REACT_APP_BASE_URL}/tasks`



export const GetTasks = async (searchQuery) => {
  try {
    // console.log(searchResults)
    const todos = await api.get( `${baseUrl}${searchQuery}` );
    return todos.data
  } catch (error) {
    return error.response.data
    // throw new Error(erro)
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