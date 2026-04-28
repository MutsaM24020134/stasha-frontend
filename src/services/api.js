import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
})

// Automatically attach token to every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token')
  if (token) {
    req.headers.Authorization = `Bearer ${token}`
  }
  return req
})

// Auth
export const registerUser = (data) => API.post('/auth/register', data)
export const loginUser = (data) => API.post('/auth/login', data)
export const forgotPassword = (data) => API.post('/auth/forgot-password', data)
export const resetPassword = (data) => API.post('/auth/reset-password', data)

// Tasks
export const fetchTasks = () => API.get('/tasks')
export const createTask = (data) => API.post('/tasks', data)
export const updateTask = (id, data) => API.put(`/tasks/${id}`, data)
export const deleteTask = (id) => API.delete(`/tasks/${id}`)