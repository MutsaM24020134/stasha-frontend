import { useState, useEffect } from 'react'
import { Plus, Trash2 } from 'lucide-react'

const COLORS = ['#fff', '#fdeee6', '#e8f5e9', '#e8f0fe', '#fff9e6', '#fce4ec']

function Notes() {
  const [notes, setNotes] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [newNote, setNewNote] = useState({ title: '', content: '', color: '#fff' })

  // Load notes from localStorage on start
  useEffect(() => {
    const saved = localStorage.getItem('stasha_notes')
    if (saved) {
      setNotes(JSON.parse(saved))
    } else {
      // Default sample notes
      const defaults = [
        { id: 1, title: 'INFS 202 Project Ideas', content: 'Task Manager app with React Router and Bootstrap. Remember to add README and screenshots before submission.', color: '#fdeee6', date: '2026-04-20' },
        { id: 2, title: 'Study Plan', content: 'Monday: React components\nTuesday: Routing\nWednesday: Forms\nThursday: Styling\nFriday: README & submission', color: '#e8f5e9', date: '2026-04-22' },
        { id: 3, title: 'Meeting Notes', content: 'Discuss project progress with lecturer. Ask about bonus marks for extra features.', color: '#e8f0fe', date: '2026-04-24' },
      ]
      setNotes(defaults)
      localStorage.setItem('stasha_notes', JSON.stringify(defaults))
    }
  }, [])

  // Save notes to localStorage whenever they change
  const saveNotes = (updated) => {
    setNotes(updated)
    localStorage.setItem('stasha_notes', JSON.stringify(updated))
  }

  const addNote = () => {
    if (!newNote.title.trim() && !newNote.content.trim()) return
    const updated = [{
      ...newNote,
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
    }, ...notes]
    saveNotes(updated)
    setNewNote({ title: '', content: '', color: '#fff' })
    setShowForm(false)
  }

  const deleteNote = (id) => {
    const updated = notes.filter(n => n.id !== id)
    saveNotes(updated)
  }

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: '700', color: '#0c2e36', margin: '0 0 4px', letterSpacing: '-0.5px' }}>Notes</h1>
          <p style={{ fontSize: '13px', color: '#a89e98', margin: 0 }}>{notes.length} notes saved</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} style={{
          background: 'linear-gradient(135deg, #D3906C, #bf7d5a)',
          color: 'white', border: 'none', padding: '11px 22px',
          borderRadius: '10px', fontSize: '14px', fontWeight: '600',
          cursor: 'pointer', boxShadow: '0 4px 14px rgba(211,144,108,0.35)',
          display: 'flex', alignItems: 'center', gap: '6px',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}>
          <Plus size={16} /> New Note
        </button>
      </div>

      {/* New note form */}
      {showForm && (
        <div style={{
          background: '#fff', borderRadius: '16px', padding: '24px',
          marginBottom: '24px', boxShadow: '0 4px 20px rgba(16,86,102,0.1)',
          border: '1px solid rgba(16,86,102,0.08)',
        }}>
          <input
            placeholder="Note title..."
            value={newNote.title}
            onChange={e => setNewNote({ ...newNote, title: e.target.value })}
            style={{
              width: '100%', border: 'none', outline: 'none',
              fontSize: '16px', fontWeight: '700', color: '#0c2e36',
              marginBottom: '12px', fontFamily: "'Plus Jakarta Sans', sans-serif",
              background: 'transparent', boxSizing: 'border-box',
            }}
          />
          <textarea
            placeholder="Write your note here..."
            value={newNote.content}
            onChange={e => setNewNote({ ...newNote, content: e.target.value })}
            style={{
              width: '100%', border: 'none', outline: 'none',
              fontSize: '14px', color: '#4a4a4a', resize: 'none',
              minHeight: '100px', lineHeight: '1.7',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              background: 'transparent', boxSizing: 'border-box',
            }}
          />

          {/* Color picker */}
          <div style={{ display: 'flex', gap: '8px', marginTop: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '12px', color: '#a89e98', fontWeight: '500' }}>Color:</span>
            {COLORS.map(c => (
              <div key={c} onClick={() => setNewNote({ ...newNote, color: c })} style={{
                width: '24px', height: '24px', borderRadius: '50%', background: c,
                border: newNote.color === c ? '2.5px solid #105666' : '1.5px solid #ddd',
                cursor: 'pointer', transition: 'all 0.15s ease',
              }} />
            ))}
            <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px' }}>
              <button onClick={addNote} style={{
                background: '#105666', color: '#fff', border: 'none',
                padding: '9px 22px', borderRadius: '8px', fontSize: '13px',
                fontWeight: '600', cursor: 'pointer',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}>Save Note</button>
              <button onClick={() => setShowForm(false)} style={{
                background: 'transparent', color: '#a89e98',
                border: '1px solid #ddd', padding: '9px 16px',
                borderRadius: '8px', fontSize: '13px', cursor: 'pointer',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Empty state */}
      {notes.length === 0 && (
        <div style={{
          background: '#fff', borderRadius: '14px', padding: '48px',
          textAlign: 'center', color: '#b0a9a4', fontSize: '14px',
          boxShadow: '0 2px 10px rgba(16,86,102,0.05)',
        }}>
          No notes yet. Click <strong>New Note</strong> to add one!
        </div>
      )}

      {/* Notes grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
        {notes.map(note => (
          <div key={note.id} style={{
            background: note.color || '#fff',
            borderRadius: '16px', padding: '20px 22px',
            boxShadow: '0 2px 12px rgba(16,86,102,0.07)',
            border: '1px solid rgba(16,86,102,0.06)',
            transition: 'all 0.2s ease', minHeight: '160px',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div>
              <div style={{ fontSize: '15px', fontWeight: '700', color: '#0c2e36', marginBottom: '10px' }}>
                {note.title || 'Untitled'}
              </div>
              <div style={{ fontSize: '13px', color: '#4a4a4a', lineHeight: '1.7', whiteSpace: 'pre-line' }}>
                {note.content}
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
              <span style={{ fontSize: '11px', color: '#a89e98' }}>{note.date}</span>
              <button onClick={() => deleteNote(note.id)} style={{
                background: 'rgba(224,85,85,0.1)', border: 'none',
                borderRadius: '7px', padding: '5px 8px',
                cursor: 'pointer', display: 'flex', alignItems: 'center',
              }}>
                <Trash2 size={14} color="#e05555" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Notes