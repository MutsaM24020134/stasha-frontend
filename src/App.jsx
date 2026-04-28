import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import List from './pages/List'
import Details from './pages/Details'
import AddItem from './pages/AddItem'
import Calendar from './pages/Calendar'
import Notes from './pages/Notes'
import SettingsPage from './pages/Settings'
import Login from './pages/Login'
import { fetchTasks, createTask, deleteTask, updateTask } from './services/api'

function App() {
  const [tasks, setTasks] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'))

  useEffect(() => {
    if (isLoggedIn) loadTasks()
  }, [isLoggedIn])

  const loadTasks = async () => {
    try {
      const res = await fetchTasks()
      const formatted = res.data.map(t => ({ ...t, dueDate: t.due_date }))
      setTasks(formatted)
    } catch (err) {
      console.error('Failed to load tasks:', err)
    }
  }

  const addTask = async (task) => {
    try {
      const res = await createTask({
        title: task.title,
        description: task.description,
        priority: task.priority,
        category: task.category,
        due_date: task.dueDate,
      })
      setTasks(prev => [{ ...res.data, dueDate: res.data.due_date }, ...prev])
    } catch (err) {
      console.error('Failed to add task:', err)
    }
  }

  const removeTask = async (id) => {
    try {
      await deleteTask(id)
      setTasks(prev => prev.filter(t => t.id !== id))
    } catch (err) {
      console.error('Failed to delete task:', err)
    }
  }

  const toggleComplete = async (id) => {
    const task = tasks.find(t => t.id === id)
    try {
      const res = await updateTask(id, { completed: !task.completed })
      setTasks(prev => prev.map(t => t.id === id ? { ...res.data, dueDate: res.data.due_date } : t))
    } catch (err) {
      console.error('Failed to update task:', err)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setTasks([])
    setIsLoggedIn(false)
  }

  const handleLoginSuccess = () => {
    setIsLoggedIn(true)
  }

  const ProtectedRoute = ({ children }) => {
    if (!isLoggedIn) return <Navigate to="/login" />
    return children
  }

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <BrowserRouter>
        <div style={{ display: 'flex' }}>
          {isLoggedIn && <Navbar onLogout={handleLogout} />}
          <div style={{
            marginLeft: isLoggedIn ? '280px' : '0',
            flex: 1,
            background: '#E2E4EA',
            minHeight: '100vh',
            padding: isLoggedIn ? '36px 40px' : '0',
          }}>
            <Routes>
              <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
              <Route path="/" element={<ProtectedRoute><Home tasks={tasks} toggleComplete={toggleComplete} /></ProtectedRoute>} />
              <Route path="/list" element={<ProtectedRoute><List tasks={tasks} deleteTask={removeTask} toggleComplete={toggleComplete} /></ProtectedRoute>} />
              <Route path="/details/:id" element={<ProtectedRoute><Details tasks={tasks} /></ProtectedRoute>} />
              <Route path="/add" element={<ProtectedRoute><AddItem addTask={addTask} /></ProtectedRoute>} />
              <Route path="/calendar" element={<ProtectedRoute><Calendar tasks={tasks} /></ProtectedRoute>} />
              <Route path="/notes" element={<ProtectedRoute><Notes /></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App