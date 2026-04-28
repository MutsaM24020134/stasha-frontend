import { useNavigate } from 'react-router-dom'
import { Bell, Calendar, ClipboardList, Timer } from 'lucide-react'

function Home({ tasks, toggleComplete }) {
  const navigate = useNavigate()
  const completed = tasks.filter(t => t.completed).length
  const pending = tasks.filter(t => !t.completed).length

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  })

  const priorityStyles = {
    High: { bg: '#fde8e8', color: '#e05555' },
    Mid: { bg: '#fff3e0', color: '#e08c3a' },
    Low: { bg: '#e8f5e9', color: '#4caf50' },
  }

  const Sparkline = ({ color }) => (
    <svg width="80" height="36" viewBox="0 0 80 36">
      <polyline
        points="0,28 16,20 32,24 48,10 64,14 80,4"
        fill="none" stroke={color} strokeWidth="2.5"
        strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  )

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: '700', color: '#0c2e36', margin: '0 0 4px', letterSpacing: '-0.5px' }}>
            Good morning, Mutsa ☀️
          </h1>
          <p style={{ fontSize: '13px', color: '#a89e98', margin: 0 }}>{today}</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '40px', height: '40px', borderRadius: '50%',
            background: '#fff', display: 'flex', alignItems: 'center',
            justifyContent: 'center', boxShadow: '0 2px 8px rgba(16,86,102,0.1)',
            cursor: 'pointer',
          }}>
            <Bell size={18} color="#105666" />
          </div>
          <button onClick={() => navigate('/add')} style={{
            background: 'linear-gradient(135deg, #D3906C, #bf7d5a)',
            color: 'white', border: 'none', padding: '11px 22px',
            borderRadius: '10px', fontSize: '14px', fontWeight: '600',
            cursor: 'pointer', boxShadow: '0 4px 14px rgba(211,144,108,0.35)',
          }}>+ New Task</button>
        </div>
      </div>

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '28px' }}>
        <div style={{
          background: '#fff', borderRadius: '16px', padding: '24px 28px',
          boxShadow: '0 2px 12px rgba(16,86,102,0.07)', border: '1px solid rgba(16,86,102,0.06)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '52px', height: '52px', borderRadius: '50%',
              background: 'rgba(16,86,102,0.08)', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
            }}>
              <ClipboardList size={24} color="#105666" />
            </div>
            <div>
              <div style={{ fontSize: '12px', color: '#a89e98', marginBottom: '4px' }}>Tasks Completed</div>
              <div style={{ fontSize: '36px', fontWeight: '700', color: '#0c2e36', lineHeight: 1, letterSpacing: '-1px' }}>{completed}</div>
              <div style={{ fontSize: '12px', color: '#a89e98', marginTop: '4px' }}>This week</div>
            </div>
          </div>
          <Sparkline color="#105666" />
        </div>

        <div style={{
          background: '#fff', borderRadius: '16px', padding: '24px 28px',
          boxShadow: '0 2px 12px rgba(211,144,108,0.07)', border: '1px solid rgba(211,144,108,0.06)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '52px', height: '52px', borderRadius: '50%',
              background: 'rgba(211,144,108,0.1)', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
            }}>
              <Timer size={24} color="#D3906C" />
            </div>
            <div>
              <div style={{ fontSize: '12px', color: '#a89e98', marginBottom: '4px' }}>Tasks Remaining</div>
              <div style={{ fontSize: '36px', fontWeight: '700', color: '#0c2e36', lineHeight: 1, letterSpacing: '-1px' }}>{pending}</div>
              <div style={{ fontSize: '12px', color: '#D3906C', marginTop: '4px' }}>Stay focused!</div>
            </div>
          </div>
          <Sparkline color="#D3906C" />
        </div>
      </div>

      {/* Today's Focus */}
      <div style={{
        background: '#fff', borderRadius: '16px',
        boxShadow: '0 2px 12px rgba(16,86,102,0.07)', border: '1px solid rgba(16,86,102,0.06)',
        overflow: 'hidden',
      }}>
        <div style={{ padding: '20px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#0c2e36', margin: '0 0 4px', letterSpacing: '-0.3px' }}>Today's Focus</h2>
            <p style={{ fontSize: '13px', color: '#a89e98', margin: 0 }}>Your top tasks for today</p>
          </div>
          <button onClick={() => navigate('/list')} style={{
            background: 'transparent', border: 'none', color: '#105666',
            fontSize: '13px', fontWeight: '600', cursor: 'pointer',
          }}>View all ›</button>
        </div>

        {tasks.map((task) => {
          const p = priorityStyles[task.priority] || priorityStyles.Low
          return (
            <div key={task.id} style={{
              padding: '16px 28px', borderTop: '1px solid #f0f0f0',
              display: 'flex', alignItems: 'center', gap: '16px',
              transition: 'background 0.15s ease',
            }}
              onMouseEnter={e => e.currentTarget.style.background = '#fafafa'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <div onClick={() => toggleComplete(task.id)} style={{
                width: '22px', height: '22px', borderRadius: '50%', flexShrink: 0,
                border: task.completed ? 'none' : '2px solid #d0d0d0',
                background: task.completed ? '#105666' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', transition: 'all 0.2s ease',
              }}>
                {task.completed && <span style={{ color: 'white', fontSize: '12px', fontWeight: '700' }}>✓</span>}
              </div>
              <span style={{
                flex: 1, fontSize: '15px', fontWeight: '500', color: '#0c2e36',
                textDecoration: task.completed ? 'line-through' : 'none',
                opacity: task.completed ? 0.5 : 1,
              }}>{task.title}</span>
              <span style={{
                fontSize: '12px', fontWeight: '600', padding: '4px 12px',
                borderRadius: '20px', background: p.bg, color: p.color,
              }}>{task.priority}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#a89e98', fontSize: '13px', minWidth: '120px', justifyContent: 'flex-end' }}>
                <Calendar size={14} color="#a89e98" /> {task.dueDate}
              </div>
            </div>
          )
        })}

        <div onClick={() => navigate('/add')} style={{
          padding: '16px 28px', borderTop: '1px solid #f0f0f0',
          display: 'flex', alignItems: 'center', gap: '10px',
          color: '#105666', fontSize: '14px', fontWeight: '600',
          cursor: 'pointer', transition: 'background 0.15s ease',
        }}
          onMouseEnter={e => e.currentTarget.style.background = '#fafafa'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          <span style={{ fontSize: '18px' }}>+</span> Add Task
        </div>
      </div>
    </div>
  )
}

export default Home