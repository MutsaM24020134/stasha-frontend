import { useState, useEffect } from 'react'
import { User, Bell, Lock, Palette, Globe } from 'lucide-react'

function SettingsPage() {
  const [activeTab, setActiveTab] = useState('Profile')
  const [saved, setSaved] = useState(false)

  // Load saved profile from localStorage
  const savedUser = JSON.parse(localStorage.getItem('user') || '{}')

  const [profile, setProfile] = useState({
    name: savedUser.name || 'Mutsa',
    email: savedUser.email || 'mutsa@student.ac.bw',
    role: 'Student',
  })

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('stasha_notifications')
    return saved ? JSON.parse(saved) : {
      email: true, push: false, reminders: true, weekly: true
    }
  })

  const [appearance, setAppearance] = useState(() => {
    const saved = localStorage.getItem('stasha_appearance')
    return saved ? JSON.parse(saved) : { fontSize: 'Medium', accent: '#D3906C' }
  })

  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('stasha_language')
    return saved ? JSON.parse(saved) : { lang: 'English (US)', timezone: 'Africa/Gaborone (GMT+2)' }
  })

  const [passwords, setPasswords] = useState({
    current: '', newPass: '', confirm: ''
  })
  const [passwordError, setPasswordError] = useState('')
  const [passwordSuccess, setPasswordSuccess] = useState('')

  const handleSave = () => {
    // Save profile
    if (activeTab === 'Profile') {
      const updated = { ...savedUser, name: profile.name, email: profile.email }
      localStorage.setItem('user', JSON.stringify(updated))
    }

    // Save notifications
    if (activeTab === 'Notifications') {
      localStorage.setItem('stasha_notifications', JSON.stringify(notifications))
    }

    // Save appearance
    if (activeTab === 'Appearance') {
      localStorage.setItem('stasha_appearance', JSON.stringify(appearance))
    }

    // Save language
    if (activeTab === 'Language') {
      localStorage.setItem('stasha_language', JSON.stringify(language))
    }

    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const handlePasswordUpdate = () => {
    setPasswordError('')
    setPasswordSuccess('')

    if (!passwords.current || !passwords.newPass || !passwords.confirm) {
      setPasswordError('All password fields are required.')
      return
    }
    if (passwords.newPass.length < 6) {
      setPasswordError('New password must be at least 6 characters.')
      return
    }
    if (passwords.newPass !== passwords.confirm) {
      setPasswordError('New passwords do not match.')
      return
    }

    setPasswordSuccess('Password updated successfully!')
    setPasswords({ current: '', newPass: '', confirm: '' })
    setTimeout(() => setPasswordSuccess(''), 2500)
  }

  const tabs = [
    { label: 'Profile', icon: <User size={16} /> },
    { label: 'Notifications', icon: <Bell size={16} /> },
    { label: 'Security', icon: <Lock size={16} /> },
    { label: 'Appearance', icon: <Palette size={16} /> },
    { label: 'Language', icon: <Globe size={16} /> },
  ]

  const inputStyle = {
    width: '100%', padding: '11px 14px', borderRadius: '10px', fontSize: '14px',
    border: '1.5px solid rgba(16,86,102,0.12)', background: '#E2E4EA',
    outline: 'none', boxSizing: 'border-box', color: '#0c2e36',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  }

  const labelStyle = {
    fontSize: '11px', color: '#105666', fontWeight: '700',
    marginBottom: '6px', display: 'block', letterSpacing: '0.8px',
  }

  const saveBtn = (label = 'Save Changes') => (
    <button onClick={handleSave} style={{
      background: 'linear-gradient(135deg, #D3906C, #bf7d5a)',
      color: '#fff', border: 'none', padding: '12px 28px',
      borderRadius: '10px', fontSize: '14px', fontWeight: '700',
      cursor: 'pointer', boxShadow: '0 4px 14px rgba(211,144,108,0.35)',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
    }}>{label}</button>
  )

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: '700', color: '#0c2e36', margin: '0 0 4px', letterSpacing: '-0.5px' }}>Settings</h1>
        <p style={{ fontSize: '13px', color: '#a89e98', margin: 0 }}>Manage your account and preferences</p>
      </div>

      {/* Success message */}
      {saved && (
        <div style={{
          background: 'linear-gradient(135deg, #105666, #0c4f5e)',
          color: '#fff', padding: '14px 20px', borderRadius: '12px',
          marginBottom: '20px', fontSize: '14px', fontWeight: '600',
          boxShadow: '0 4px 16px rgba(16,86,102,0.25)',
        }}>✓ Settings saved successfully!</div>
      )}

      <div style={{ display: 'flex', gap: '20px' }}>

        {/* Sidebar tabs */}
        <div style={{
          width: '200px', background: '#fff', borderRadius: '16px', padding: '12px',
          boxShadow: '0 2px 12px rgba(16,86,102,0.07)',
          border: '1px solid rgba(16,86,102,0.06)',
          height: 'fit-content', flexShrink: 0,
        }}>
          {tabs.map(({ label, icon }) => (
            <button key={label} onClick={() => setActiveTab(label)} style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: '10px',
              padding: '11px 14px', borderRadius: '10px', border: 'none',
              cursor: 'pointer',
              background: activeTab === label ? 'rgba(16,86,102,0.08)' : 'transparent',
              color: activeTab === label ? '#105666' : '#a89e98',
              fontSize: '14px', fontWeight: activeTab === label ? '700' : '400',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              transition: 'all 0.2s ease', marginBottom: '2px', textAlign: 'left',
            }}>{icon} {label}</button>
          ))}
        </div>

        {/* Content panel */}
        <div style={{
          flex: 1, background: '#fff', borderRadius: '16px', padding: '28px',
          boxShadow: '0 2px 12px rgba(16,86,102,0.07)',
          border: '1px solid rgba(16,86,102,0.06)',
        }}>

          {/* Profile tab */}
          {activeTab === 'Profile' && (
            <div>
              <h2 style={{ fontSize: '17px', fontWeight: '700', color: '#0c2e36', marginBottom: '24px' }}>Profile Information</h2>

              {/* Avatar */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px' }}>
                <div style={{
                  width: '64px', height: '64px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, #D3906C, #bf7d5a)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '24px', fontWeight: '700', color: 'white',
                }}>
                  {profile.name ? profile.name[0].toUpperCase() : 'M'}
                </div>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: '700', color: '#0c2e36' }}>{profile.name}</div>
                  <div style={{ fontSize: '13px', color: '#a89e98', marginTop: '2px' }}>{profile.role}</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ marginBottom: '20px' }}>
                  <label style={labelStyle}>FULL NAME</label>
                  <input style={inputStyle} value={profile.name}
                    onChange={e => setProfile({ ...profile, name: e.target.value })} />
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <label style={labelStyle}>ROLE</label>
                  <input style={inputStyle} value={profile.role}
                    onChange={e => setProfile({ ...profile, role: e.target.value })} />
                </div>
              </div>
              <div style={{ marginBottom: '28px' }}>
                <label style={labelStyle}>EMAIL ADDRESS</label>
                <input style={inputStyle} value={profile.email}
                  onChange={e => setProfile({ ...profile, email: e.target.value })} />
              </div>
              {saveBtn()}
            </div>
          )}

          {/* Notifications tab */}
          {activeTab === 'Notifications' && (
            <div>
              <h2 style={{ fontSize: '17px', fontWeight: '700', color: '#0c2e36', marginBottom: '24px' }}>Notification Preferences</h2>
              {[
                { key: 'email', label: 'Email Notifications', desc: 'Receive updates via email' },
                { key: 'push', label: 'Push Notifications', desc: 'Get notified in the browser' },
                { key: 'reminders', label: 'Task Reminders', desc: 'Reminders before task due dates' },
                { key: 'weekly', label: 'Weekly Summary', desc: 'Weekly digest of your tasks' },
              ].map(({ key, label, desc }) => (
                <div key={key} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '16px 0', borderBottom: '1px solid #f0f0f0',
                }}>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#0c2e36' }}>{label}</div>
                    <div style={{ fontSize: '12px', color: '#a89e98', marginTop: '2px' }}>{desc}</div>
                  </div>
                  {/* Toggle switch */}
                  <div onClick={() => setNotifications({ ...notifications, [key]: !notifications[key] })} style={{
                    width: '44px', height: '24px', borderRadius: '12px', cursor: 'pointer',
                    background: notifications[key] ? '#105666' : '#ddd',
                    position: 'relative', transition: 'all 0.2s ease', flexShrink: 0,
                  }}>
                    <div style={{
                      width: '18px', height: '18px', borderRadius: '50%', background: '#fff',
                      position: 'absolute', top: '3px', transition: 'all 0.2s ease',
                      left: notifications[key] ? '23px' : '3px',
                      boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
                    }} />
                  </div>
                </div>
              ))}
              <div style={{ marginTop: '24px' }}>{saveBtn()}</div>
            </div>
          )}

          {/* Security tab */}
          {activeTab === 'Security' && (
            <div>
              <h2 style={{ fontSize: '17px', fontWeight: '700', color: '#0c2e36', marginBottom: '24px' }}>Security Settings</h2>

              {passwordError && (
                <div style={{
                  background: '#fde8e8', color: '#e05555', padding: '12px 16px',
                  borderRadius: '10px', fontSize: '13px', marginBottom: '16px', fontWeight: '500',
                }}>{passwordError}</div>
              )}

              {passwordSuccess && (
                <div style={{
                  background: 'rgba(16,86,102,0.08)', color: '#105666', padding: '12px 16px',
                  borderRadius: '10px', fontSize: '13px', marginBottom: '16px', fontWeight: '500',
                }}>✓ {passwordSuccess}</div>
              )}

              <div style={{ marginBottom: '20px' }}>
                <label style={labelStyle}>CURRENT PASSWORD</label>
                <input type="password" style={inputStyle} placeholder="••••••••"
                  value={passwords.current}
                  onChange={e => setPasswords({ ...passwords, current: e.target.value })} />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={labelStyle}>NEW PASSWORD</label>
                <input type="password" style={inputStyle} placeholder="••••••••"
                  value={passwords.newPass}
                  onChange={e => setPasswords({ ...passwords, newPass: e.target.value })} />
              </div>
              <div style={{ marginBottom: '28px' }}>
                <label style={labelStyle}>CONFIRM NEW PASSWORD</label>
                <input type="password" style={inputStyle} placeholder="••••••••"
                  value={passwords.confirm}
                  onChange={e => setPasswords({ ...passwords, confirm: e.target.value })} />
              </div>
              <button onClick={handlePasswordUpdate} style={{
                background: 'linear-gradient(135deg, #D3906C, #bf7d5a)',
                color: '#fff', border: 'none', padding: '12px 28px',
                borderRadius: '10px', fontSize: '14px', fontWeight: '700',
                cursor: 'pointer', boxShadow: '0 4px 14px rgba(211,144,108,0.35)',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}>Update Password</button>
            </div>
          )}

          {/* Appearance tab */}
          {activeTab === 'Appearance' && (
            <div>
              <h2 style={{ fontSize: '17px', fontWeight: '700', color: '#0c2e36', marginBottom: '24px' }}>Appearance</h2>

              <label style={labelStyle}>ACCENT COLOR</label>
              <div style={{ display: 'flex', gap: '12px', marginBottom: '28px', marginTop: '8px', flexWrap: 'wrap' }}>
                {['#D3906C', '#105666', '#6C63FF', '#2196F3', '#4CAF50', '#E91E63'].map(c => (
                  <div key={c} onClick={() => setAppearance({ ...appearance, accent: c })} style={{
                    width: '36px', height: '36px', borderRadius: '50%', background: c,
                    cursor: 'pointer',
                    border: appearance.accent === c ? '3px solid #0c2e36' : '3px solid transparent',
                    transition: 'all 0.2s ease',
                    boxShadow: appearance.accent === c ? '0 0 0 2px white inset' : 'none',
                  }} />
                ))}
              </div>

              <label style={labelStyle}>FONT SIZE</label>
              <select style={{ ...inputStyle, marginBottom: '28px' }}
                value={appearance.fontSize}
                onChange={e => setAppearance({ ...appearance, fontSize: e.target.value })}>
                <option>Small</option>
                <option>Medium</option>
                <option>Large</option>
              </select>

              {saveBtn('Save Preferences')}
            </div>
          )}

          {/* Language tab */}
          {activeTab === 'Language' && (
            <div>
              <h2 style={{ fontSize: '17px', fontWeight: '700', color: '#0c2e36', marginBottom: '24px' }}>Language & Region</h2>

              <div style={{ marginBottom: '20px' }}>
                <label style={labelStyle}>LANGUAGE</label>
                <select style={inputStyle}
                  value={language.lang}
                  onChange={e => setLanguage({ ...language, lang: e.target.value })}>
                  <option>English (US)</option>
                  <option>English (UK)</option>
                  <option>French</option>
                  <option>Portuguese</option>
                  <option>Setswana</option>
                </select>
              </div>

              <div style={{ marginBottom: '28px' }}>
                <label style={labelStyle}>TIMEZONE</label>
                <select style={inputStyle}
                  value={language.timezone}
                  onChange={e => setLanguage({ ...language, timezone: e.target.value })}>
                  <option>Africa/Gaborone (GMT+2)</option>
                  <option>Africa/Johannesburg (GMT+2)</option>
                  <option>UTC</option>
                  <option>Europe/London (GMT+0)</option>
                </select>
              </div>

              {saveBtn()}
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default SettingsPage