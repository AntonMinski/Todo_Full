import axios from 'axios'
import toast from './toast'


export const errorResponseHandler = (error) => {
  // check for errorHandle config
  if( error.config.hasOwnProperty('errorHandle') && error.config.errorHandle === false ) {
      return Promise.reject(error);
  }

  // if has response show the error
  if (error.response) {
      toast.error(error.response.data.message);
  }
}


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
  if (response.data.message === 'Success') return response
  //  {response.data.message = 'Tasks Loaded'}
  toast.success(response.data.message)

  return response

}, async function (error) {

  toast.error(error.response.data.message)

});




// api.interceptors.response.use(
//   response => response,
//   errorResponseHandler
// );
  
export default api






   // Response interceptor for API calls
// api.interceptors.response.use((response) => {
//   return response
// }, async function (error) {
//   const originalRequest = error.config;
//   if (error.response.status === 403 && !originalRequest._retry) {
//     originalRequest._retry = true;
//     return setTimeout( api(originalRequest), 2000)
//   }
//   return Promise.reject(error);
// });