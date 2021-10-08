import axios from 'axios'


const api = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}/tasks`,
    headers: {
      'Content-Type': 'application/json'
    },
  })

api.interceptors.request.use(
    async config => {
      const token = await localStorage.getItem('token')
      config.headers['Authorization'] = `Bearer ${token}`
      return config
    },
    error => Promise.reject(error)
  )

  // Response interceptor for API calls
api.interceptors.response.use((response) => {
  return response
}, async function (error) {
  const originalRequest = error.config;
  if (error.response.status === 403 && !originalRequest._retry) {
    originalRequest._retry = true;
    return setTimeout( api(originalRequest), 2000)
  }
  return Promise.reject(error);
});
  
  export default api