import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

function Calendar({ tasks }) {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 3, 1))

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December']
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1))
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1))

  const getTasksForDay = (day) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return tasks.filter(t => t.dueDate === dateStr)
  }

  const today = new Date()
  const isToday = (day) =>
    day === today.getDate() && month === today.getMonth() && year === today.getFullYear()

  const priorityColors = { High: '#e05555', Mid: '#e08c3a', Low: '#4caf50' }

  const cells = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: '700', color: '#0c2e36', margin: '0 0 4px', letterSpacing: '-0.5px' }}>Calendar</h1>
        <p style={{ fontSize: '13px', color: '#a89e98', margin: 0 }}>View your tasks by due date</p>
      </div>

      <div style={{ background: '#fff', borderRadius: '16px', padding: '28px', boxShadow: '0 2px 12px rgba(16,86,102,0.07)', border: '1px solid rgba(16,86,102,0.06)' }}>

        {/* Month nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <button onClick={prevMonth} style={{ background: '#EDEEF2', border: 'none', borderRadius: '8px', padding: '8px 12px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <ChevronLeft size={18} color="#105666" />
          </button>
          <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#0c2e36', margin: 0 }}>
            {monthNames[month]} {year}
          </h2>
          <button onClick={nextMonth} style={{ background: '#EDEEF2', border: 'none', borderRadius: '8px', padding: '8px 12px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <ChevronRight size={18} color="#105666" />
          </button>
        </div>

        {/* Day names */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px', marginBottom: '8px' }}>
          {dayNames.map(d => (
            <div key={d} style={{ textAlign: 'center', fontSize: '11px', fontWeight: '700', color: '#a89e98', letterSpacing: '0.5px', padding: '4px 0' }}>{d}</div>
          ))}
        </div>

        {/* Calendar grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px' }}>
          {cells.map((day, i) => {
            const dayTasks = day ? getTasksForDay(day) : []
            return (
              <div key={i} style={{
                minHeight: '80px', borderRadius: '10px', padding: '8px',
                background: day ? (isToday(day) ? '#105666' : '#EDEEF2') : 'transparent',
                border: day ? '1px solid rgba(16,86,102,0.08)' : 'none',
                transition: 'all 0.2s ease',
              }}>
                {day && (
                  <>
                    <div style={{
                      fontSize: '13px', fontWeight: '700',
                      color: isToday(day) ? '#fff' : '#0c2e36',
                      marginBottom: '6px',
                    }}>{day}</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                      {dayTasks.map(t => (
                        <div key={t.id} style={{
                          fontSize: '10px', fontWeight: '600',
                          color: '#fff', padding: '2px 6px', borderRadius: '4px',
                          background: priorityColors[t.priority] || '#888',
                          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                        }}>{t.title}</div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', gap: '16px', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #f0f0f0' }}>
          {[['High', '#e05555'], ['Mid', '#e08c3a'], ['Low', '#4caf50']].map(([label, color]) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '3px', background: color }} />
              <span style={{ fontSize: '12px', color: '#a89e98', fontWeight: '500' }}>{label} Priority</span>
            </div>
          ))}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '3px', background: '#105666' }} />
            <span style={{ fontSize: '12px', color: '#a89e98', fontWeight: '500' }}>Today</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Calendar