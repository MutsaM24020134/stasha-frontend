import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function AddItem({ addTask }) {
  const navigate = useNavigate()
  const [form, setForm] = useState({ title: '', description: '', priority: 'Low', category: '', dueDate: '' })
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.title.trim()) e.title = 'Title is required'
    if (!form.category.trim()) e.category = 'Category is required'
    if (!form.dueDate) e.dueDate = 'Due date is required'
    return e
  }

  const handleSubmit = () => {
    const e = validate()
    if (Object.keys(e).length > 0) { setErrors(e); return }
    addTask(form)
    setSuccess(true)
    setTimeout(() => navigate('/list'), 1500)
  }

  const inputStyle = (field) => ({
    width: '100%', padding: '12px 16px', borderRadius: '10px', fontSize: '14px',
    border: `1.5px solid ${errors[field] ? '#e05555' : 'rgba(16,86,102,0.12)'}`,
    background: '#F4F5F7', outline: 'none', boxSizing: 'border-box',
    fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#0c2e36',
    transition: 'border 0.2s ease',
  })

  const labelStyle = {
    fontSize: '11px', color: '#105666', fontWeight: '700',
    marginBottom: '6px', display: 'block', letterSpacing: '0.8px',
  }

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: '700', color: '#0c2e36', margin: '0 0 4px', letterSpacing: '-0.5px' }}>Add New Task</h1>
        <p style={{ fontSize: '13px', color: '#a89e98', margin: 0 }}>Fill in the details below</p>
      </div>

      {success && (
        <div style={{
          background: 'linear-gradient(135deg, #105666, #0c4f5e)',
          color: '#fff', padding: '14px 20px', borderRadius: '12px',
          marginBottom: '20px', fontSize: '14px', fontWeight: '600',
          boxShadow: '0 4px 16px rgba(16,86,102,0.25)',
        }}>
          ✓ Task added successfully! Redirecting...
        </div>
      )}

      <div style={{
        background: '#fff', borderRadius: '16px', padding: '36px',
        maxWidth: '640px', boxShadow: '0 2px 12px rgba(16,86,102,0.07)',
        border: '1px solid rgba(16,86,102,0.06)',
      }}>

        <div style={{ marginBottom: '22px' }}>
          <label style={labelStyle}>TASK TITLE *</label>
          <input style={inputStyle('title')} placeholder="e.g. Website Development"
            value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
          {errors.title && <p style={{ fontSize: '12px', color: '#e05555', marginTop: '4px' }}>{errors.title}</p>}
        </div>

        <div style={{ marginBottom: '22px' }}>
          <label style={labelStyle}>DESCRIPTION</label>
          <textarea style={{ ...inputStyle('description'), resize: 'vertical', minHeight: '100px' }}
            placeholder="Describe the task..."
            value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div style={{ marginBottom: '22px' }}>
            <label style={labelStyle}>PRIORITY</label>
            <select style={inputStyle('priority')} value={form.priority}
              onChange={e => setForm({ ...form, priority: e.target.value })}>
              <option>Low</option>
              <option>Mid</option>
              <option>High</option>
            </select>
          </div>

          <div style={{ marginBottom: '22px' }}>
            <label style={labelStyle}>CATEGORY *</label>
            <input style={inputStyle('category')} placeholder="e.g. Work, Health, School"
              value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} />
            {errors.category && <p style={{ fontSize: '12px', color: '#e05555', marginTop: '4px' }}>{errors.category}</p>}
          </div>
        </div>

        <div style={{ marginBottom: '28px' }}>
          <label style={labelStyle}>DUE DATE *</label>
          <input type="date" style={inputStyle('dueDate')}
            value={form.dueDate} onChange={e => setForm({ ...form, dueDate: e.target.value })} />
          {errors.dueDate && <p style={{ fontSize: '12px', color: '#e05555', marginTop: '4px' }}>{errors.dueDate}</p>}
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={handleSubmit} style={{
            background: 'linear-gradient(135deg, #D3906C, #bf7d5a)',
            color: '#fff', border: 'none', padding: '13px 30px',
            borderRadius: '10px', fontSize: '14px', fontWeight: '700',
            cursor: 'pointer', boxShadow: '0 4px 14px rgba(211,144,108,0.35)',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}>Add Task</button>
          <button onClick={() => navigate('/list')} style={{
            background: 'transparent', color: '#105666',
            border: '1.5px solid #105666', padding: '13px 30px',
            borderRadius: '10px', fontSize: '14px', fontWeight: '700',
            cursor: 'pointer', fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default AddItem