import api from './axios.api';

const baseUrl = `${process.env.REACT_APP_BASE_URL}/tasks`



export const GetTasks = async () => {
  try {
    const todos = await api.get( baseUrl
     );
    return todos
  } catch (error) {
    console.log(error);
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
    return saveTodo;
  } catch (error) {
    throw new Error(error);
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
    return updatedTask
  } catch (error) {
    throw new Error(error)
  }
}

export const deleteTask = async (id, token) => {
  try {
    const config = {
      method: "DELETE",
      url: `${baseUrl}/${id}`,
    }
    const deletedTask = await api(config);
    return deletedTask
  } catch (error) {
    throw new Error(error)
  }
}