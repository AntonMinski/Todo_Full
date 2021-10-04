import axios from 'axios'

const baseUrl = `${process.env.REACT_APP_BASE_URL}/tasks`



export const GetTasks = async (token) => {
  try {
    const todos = await axios.get( baseUrl, {
      headers: {
        'content-type': "application/json",
        'Authorization': `Bearer ${token}`
    }
    });
    return todos
  } catch (error) {
    console.log(error);
  }
}

export const addTask = async (formData, token) => {
  try {
    const config = {
      method: "POST",
      url: baseUrl,
      data: { task: formData.task },
      headers: {
                'content-type': "application/json",
                'Authorization': `Bearer ${token}`
              },
    }    
    const saveTodo = await axios(config);
    return saveTodo;
  } catch (error) {
    throw new Error(error);
  }
}

export const completeTask = async (id, token) => {
  try {
    const config = {
      method: "PATCH",
      url: `${baseUrl}/${id}`,
      data: { 'isActive': false },
      headers: {
                'content-type': "application/json",
                'Authorization': `Bearer ${token}`
              },
    }    
    const updatedTask = await axios(config)
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
      headers: {
                'content-type': "application/json",
                Authorization: `Bearer ${token}`
              },
    }
    const deletedTask = await axios(config);
    return deletedTask
  } catch (error) {
    throw new Error(error)
  }
}