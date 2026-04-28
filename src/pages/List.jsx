import { useState } from 'react'
import TaskCard from '../components/TaskCard'
import { Search } from 'lucide-react'

function List({ tasks, deleteTask, toggleComplete }) {
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')
  const filters = ['All', 'Pending', 'Completed']

  const filtered = tasks.filter(t => {
    const matchFilter = filter === 'All' ? true : filter === 'Pending' ? !t.completed : t.completed
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: '700', color: '#0c2e36', margin: '0 0 4px', letterSpacing: '-0.5px' }}>My Tasks</h1>
        <p style={{ fontSize: '13px', color: '#a89e98', margin: 0 }}>{tasks.length} total tasks</p>
      </div>

      {/* Search */}
      <div style={{ position: 'relative', marginBottom: '16px' }}>
        <Search size={16} color="#a89e98" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
        <input
          type="text" placeholder="Search tasks..."
          value={search} onChange={e => setSearch(e.target.value)}
          style={{
            width: '100%', padding: '11px 16px 11px 40px',
            borderRadius: '10px', border: '1px solid rgba(16,86,102,0.12)',
            background: '#fff', fontSize: '13px', outline: 'none',
            boxShadow: '0 2px 8px rgba(16,86,102,0.05)',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            boxSizing: 'border-box', color: '#0c2e36',
          }}
        />
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        {filters.map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: '7px 20px', borderRadius: '20px', fontSize: '13px',
            fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s ease',
            background: filter === f ? '#105666' : '#fff',
            color: filter === f ? '#fff' : '#105666',
            border: `1.5px solid ${filter === f ? '#105666' : 'rgba(16,86,102,0.15)'}`,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}>{f}</button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div style={{
          background: '#fff', borderRadius: '14px', padding: '48px',
          textAlign: 'center', color: '#b0a9a4', fontSize: '14px',
        }}>No tasks found.</div>
      ) : filtered.map(task => (
        <TaskCard key={task.id} task={task} deleteTask={deleteTask} toggleComplete={toggleComplete} />
      ))}
    </div>
  )
}

export default List