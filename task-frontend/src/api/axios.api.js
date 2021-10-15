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

const getNewToken = async() => {
  const refreshToken = localStorage.getItem('refreshToken')
  const token = localStorage.getItem('token')
  // console.log('refreshToken', refreshToken)

  const config = {
    method: "POST",
    url: `${process.env.REACT_APP_BASE_URL}/refreshToken`,
    data: { refreshToken },
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  }
  // console.log(config) 
  const response = await axios(config)
  localStorage.setItem('token', response.data.access_token)
  console.log('accessToken', response.data.access_token)
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

}, (error) => {
  console.log(error.response.status)
  if (error.response.data.statusCode === 401) {
      getNewToken()
      
      const originalRequest = error.config
      return api(originalRequest)
  }
  else {
    toast.error(error.response.data.message)
  }
  

});

  
export default api






