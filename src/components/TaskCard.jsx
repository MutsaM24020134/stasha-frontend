import { useNavigate } from 'react-router-dom'
import { Calendar } from 'lucide-react'

function TaskCard({ task, deleteTask, toggleComplete }) {
  const navigate = useNavigate()

  const priorityStyles = {
    High: { bg: '#fde8e8', color: '#e05555' },
    Mid: { bg: '#fff3e0', color: '#e08c3a' },
    Low: { bg: '#e8f5e9', color: '#4caf50' },
  }
  const p = priorityStyles[task.priority] || priorityStyles.Low

  return (
    <div style={{
      background: '#fff', borderRadius: '14px', padding: '16px 22px',
      marginBottom: '10px', boxShadow: '0 2px 10px rgba(16,86,102,0.06)',
      border: '1px solid rgba(16,86,102,0.06)',
      display: 'flex', alignItems: 'center', gap: '14px',
      opacity: task.completed ? 0.65 : 1,
      transition: 'all 0.2s ease',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
    }}
      onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
    >
      {/* Circle checkbox */}
      <div onClick={() => toggleComplete(task.id)} style={{
        width: '22px', height: '22px', borderRadius: '50%', flexShrink: 0,
        border: task.completed ? 'none' : '2px solid #d0d0d0',
        background: task.completed ? '#105666' : 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', transition: 'all 0.2s ease',
      }}>
        {task.completed && <span style={{ color: 'white', fontSize: '11px', fontWeight: '700' }}>✓</span>}
      </div>

      {/* Title & category */}
      <div style={{ flex: 1 }}>
        <div style={{
          fontSize: '14px', fontWeight: '600', color: '#0c2e36',
          textDecoration: task.completed ? 'line-through' : 'none',
        }}>{task.title}</div>
        <div style={{ fontSize: '12px', color: '#a89e98', marginTop: '2px' }}>{task.category}</div>
      </div>

      {/* Priority */}
      <span style={{
        fontSize: '11px', fontWeight: '600', padding: '4px 12px',
        borderRadius: '20px', background: p.bg, color: p.color,
      }}>{task.priority}</span>

      {/* Due date */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#a89e98', fontSize: '12px', minWidth: '100px' }}>
        <Calendar size={13} color="#a89e98" /> {task.dueDate}
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '8px' }}>
        <button onClick={() => navigate(`/details/${task.id}`)} style={{
          background: '#105666', color: '#fff', border: 'none',
          padding: '6px 14px', borderRadius: '8px', fontSize: '12px',
          fontWeight: '600', cursor: 'pointer',
        }}>View</button>
        <button onClick={() => deleteTask(task.id)} style={{
          background: '#fde8e8', color: '#e05555', border: 'none',
          padding: '6px 14px', borderRadius: '8px', fontSize: '12px',
          fontWeight: '600', cursor: 'pointer',
        }}>Delete</button>
      </div>
    </div>
  )
}

export default TaskCard