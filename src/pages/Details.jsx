import { useParams, useNavigate } from 'react-router-dom'
import { Calendar, Tag, CheckCircle } from 'lucide-react'

function Details({ tasks }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const task = tasks.find(t => t.id === parseInt(id) || t.id === id)

  if (!task) return (
    <div style={{ textAlign: 'center', padding: '60px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <p style={{ color: '#b0a9a4', marginBottom: '16px' }}>Task not found.</p>
      <button onClick={() => navigate('/list')} style={{
        background: '#105666', color: '#fff', border: 'none',
        padding: '10px 24px', borderRadius: '10px', cursor: 'pointer', fontWeight: '600',
      }}>Back to Tasks</button>
    </div>
  )

  const priorityStyles = {
    High: { bg: '#fde8e8', color: '#e05555' },
    Mid: { bg: '#fff3e0', color: '#e08c3a' },
    Low: { bg: '#e8f5e9', color: '#4caf50' },
  }
  const p = priorityStyles[task.priority] || priorityStyles.Low

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <button onClick={() => navigate('/list')} style={{
        background: 'transparent', border: 'none', color: '#105666',
        fontSize: '13px', fontWeight: '600', cursor: 'pointer',
        marginBottom: '20px', padding: 0,
      }}>← Back to Tasks</button>

      <div style={{
        background: '#fff', borderRadius: '16px', padding: '36px',
        boxShadow: '0 2px 12px rgba(16,86,102,0.07)',
        border: '1px solid rgba(16,86,102,0.06)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px', flexWrap: 'wrap', gap: '12px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#0c2e36', margin: 0, letterSpacing: '-0.3px' }}>{task.title}</h1>
          <span style={{ fontSize: '12px', fontWeight: '600', background: p.bg, color: p.color, padding: '6px 16px', borderRadius: '20px' }}>
            {task.priority} Priority
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '24px' }}>
          {[
            { icon: <Tag size={16} color="#105666" />, label: 'CATEGORY', value: task.category },
            { icon: <Calendar size={16} color="#105666" />, label: 'DUE DATE', value: task.dueDate },
            { icon: <CheckCircle size={16} color="#105666" />, label: 'STATUS', value: task.completed ? 'Completed ✓' : 'Pending' },
          ].map(({ icon, label, value }) => (
            <div key={label} style={{ background: '#F4F5F7', borderRadius: '12px', padding: '16px 18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                {icon}
                <span style={{ fontSize: '10px', color: '#a89e98', letterSpacing: '1px', fontWeight: '600' }}>{label}</span>
              </div>
              <div style={{ fontSize: '15px', fontWeight: '600', color: '#0c2e36' }}>{value}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#F4F5F7', borderRadius: '12px', padding: '18px 20px' }}>
          <div style={{ fontSize: '10px', color: '#a89e98', letterSpacing: '1px', fontWeight: '600', marginBottom: '10px' }}>DESCRIPTION</div>
          <div style={{ fontSize: '14px', color: '#4a4a4a', lineHeight: '1.8' }}>{task.description}</div>
        </div>
      </div>
    </div>
  )
}

export default Details