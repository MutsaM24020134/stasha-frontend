import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, CheckSquare, Calendar, FileText, Settings, LogOut } from 'lucide-react'

function Navbar({ onLogout }) {
  const location = useLocation()
  const isActive = (path) => location.pathname === path

  const navItems = [
    { to: '/', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { to: '/list', label: 'My Tasks', icon: <CheckSquare size={18} /> },
    { to: '/calendar', label: 'Calendar', icon: <Calendar size={18} /> },
    { to: '/notes', label: 'Notes', icon: <FileText size={18} /> },
  ]

  const user = JSON.parse(localStorage.getItem('user') || '{}')

  const LogoIcon = () => (
    <svg width="56" height="56" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="navGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#D3906C' }} />
          <stop offset="100%" style={{ stopColor: '#105666' }} />
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="152" height="152" rx="38" fill="url(#navGrad)" />
      <path d="M 108 42 Q 108 28 80 28 Q 42 28 42 58 Q 42 80 80 80" fill="none" stroke="white" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" opacity="0.95" />
      <path d="M 52 80 Q 52 132 80 132 Q 118 132 118 102 Q 118 80 80 80" fill="none" stroke="white" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" opacity="0.75" />
      <polyline points="68,108 80,122 110,90" fill="none" stroke="white" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" opacity="0.95" />
    </svg>
  )

  return (
    <div style={{
      width: '280px',
      background: 'linear-gradient(180deg, #0c4f5e 0%, #105666 60%, #093d4b 100%)',
      minHeight: '100vh',
      padding: '24px 16px',
      position: 'fixed',
      top: 0, left: 0,
      display: 'flex',
      flexDirection: 'column',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      zIndex: 100,
    }}>

      {/* Logo section */}
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        padding: '16px 10px 28px', marginBottom: '8px',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}>
        <LogoIcon />
        <div style={{
          fontSize: '24px', fontWeight: '800', color: '#fff',
          letterSpacing: '-0.5px', marginTop: '12px', lineHeight: 1,
        }}>Stasha</div>
        <div style={{
          fontSize: '9px', color: '#D3906C',
          letterSpacing: '2.5px', marginTop: '6px', fontWeight: '600',
        }}>PLAN. FOCUS. ACHIEVE.</div>
      </div>

      {/* Nav items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '12px' }}>
        {navItems.map(({ to, label, icon }) => (
          <Link key={to} to={to} style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            padding: '12px 16px', borderRadius: '10px',
            background: isActive(to) ? 'rgba(211,144,108,0.85)' : 'transparent',
            color: isActive(to) ? '#fff' : 'rgba(255,255,255,0.55)',
            textDecoration: 'none', fontSize: '14px',
            fontWeight: isActive(to) ? '600' : '400',
            transition: 'all 0.2s ease',
            boxShadow: isActive(to) ? '0 4px 14px rgba(211,144,108,0.3)' : 'none',
          }}>
            {icon} {label}
          </Link>
        ))}
      </div>

      {/* Divider */}
      <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', margin: '20px 10px' }} />

      {/* Settings */}
      <Link to="/settings" style={{
        display: 'flex', alignItems: 'center', gap: '12px',
        padding: '12px 16px', borderRadius: '10px',
        color: isActive('/settings') ? '#fff' : 'rgba(255,255,255,0.45)',
        background: isActive('/settings') ? 'rgba(211,144,108,0.85)' : 'transparent',
        textDecoration: 'none', fontSize: '14px',
        transition: 'all 0.2s ease',
      }}>
        <Settings size={18} /> Settings
      </Link>

      {/* User card */}
      <div style={{
        marginTop: 'auto',
        background: 'rgba(255,255,255,0.07)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '12px', padding: '14px 16px',
      }}>
        {/* User info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #D3906C, #bf7d5a)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '14px', fontWeight: '700', color: 'white', flexShrink: 0,
          }}>
            {user?.name ? user.name[0].toUpperCase() : 'M'}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '13px', fontWeight: '600', color: 'rgba(255,255,255,0.9)' }}>
              {user?.name || 'Mutsa'}
            </div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)' }}>Student</div>
          </div>
        </div>

        {/* Logout button */}
        <button onClick={onLogout} style={{
          width: '100%',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
          background: 'rgba(211,144,108,0.15)',
          border: '1px solid rgba(211,144,108,0.3)',
          color: '#D3906C', padding: '9px',
          borderRadius: '8px', fontSize: '13px', fontWeight: '600',
          cursor: 'pointer', fontFamily: "'Plus Jakarta Sans', sans-serif",
          transition: 'all 0.2s ease',
        }}>
          <LogOut size={14} /> Logout
        </button>
      </div>
    </div>
  )
}

export default Navbar