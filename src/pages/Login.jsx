import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser, registerUser, forgotPassword, resetPassword } from '../services/api'

const SECURITY_QUESTIONS = [
  "What was the name of your first pet?",
  "What is your mother's maiden name?",
  "What was the name of your primary school?",
  "What city were you born in?",
  "What is your favourite movie?",
]

function Login({ onLoginSuccess }) {
  const navigate = useNavigate()

  // Modes: 'login' | 'register' | 'forgot' | 'reset'
  const [mode, setMode] = useState('login')

  const [form, setForm] = useState({
    name: '', email: '', password: '',
    securityQuestion: SECURITY_QUESTIONS[0], securityAnswer: ''
  })

  const [forgotEmail, setForgotEmail] = useState('')
  const [securityQuestion, setSecurityQuestion] = useState('')
  const [resetForm, setResetForm] = useState({ securityAnswer: '', newPassword: '', confirmPassword: '' })

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setError('')
    setLoading(true)
    try {
      const res = await loginUser({ email: form.email, password: form.password })
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      onLoginSuccess()
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async () => {
    setError('')
    if (!form.securityAnswer.trim()) {
      setError('Please provide a security answer.')
      return
    }
    setLoading(true)
    try {
      const res = await registerUser({
        name: form.name,
        email: form.email,
        password: form.password,
        securityQuestion: form.securityQuestion,
        securityAnswer: form.securityAnswer,
      })
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      onLoginSuccess()
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  const handleForgot = async () => {
    setError('')
    setLoading(true)
    try {
      const res = await forgotPassword({ email: forgotEmail })
      setSecurityQuestion(res.data.securityQuestion)
      setMode('reset')
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = async () => {
    setError('')
    if (resetForm.newPassword !== resetForm.confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    setLoading(true)
    try {
      await resetPassword({
        email: forgotEmail,
        securityAnswer: resetForm.securityAnswer,
        newPassword: resetForm.newPassword,
      })
      setSuccess('Password reset successfully! Please login.')
      setTimeout(() => {
        setMode('login')
        setSuccess('')
        setResetForm({ securityAnswer: '', newPassword: '', confirmPassword: '' })
      }, 2000)
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%', padding: '12px 16px', borderRadius: '10px', fontSize: '14px',
    border: '1.5px solid rgba(255,255,255,0.2)',
    background: 'rgba(255,255,255,0.1)',
    outline: 'none', boxSizing: 'border-box', color: '#fff',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  }

  const labelStyle = {
    fontSize: '11px', color: 'rgba(255,255,255,0.6)', fontWeight: '700',
    marginBottom: '6px', display: 'block', letterSpacing: '0.8px',
  }

  const LogoSVG = () => (
    <svg width="70" height="70" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="loginGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D3906C" />
          <stop offset="100%" stopColor="#105666" />
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="152" height="152" rx="38" fill="url(#loginGrad)" />
      <path d="M 108 42 Q 108 28 80 28 Q 42 28 42 58 Q 42 80 80 80" fill="none" stroke="white" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" opacity="0.95" />
      <path d="M 52 80 Q 52 132 80 132 Q 118 132 118 102 Q 118 80 80 80" fill="none" stroke="white" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" opacity="0.75" />
      <polyline points="68,108 80,122 110,90" fill="none" stroke="white" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" opacity="0.95" />
    </svg>
  )

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0c4f5e 0%, #105666 50%, #093d4b 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Bubbles */}
      <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(211,144,108,0.2)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: '250px', height: '250px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '40%', left: '-40px', width: '150px', height: '150px', borderRadius: '50%', background: 'rgba(211,144,108,0.1)', pointerEvents: 'none' }} />

      <div style={{
        background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)',
        borderRadius: '24px', padding: '48px 40px', width: '100%', maxWidth: '440px',
        border: '1px solid rgba(255,255,255,0.15)',
        boxShadow: '0 24px 64px rgba(0,0,0,0.2)', position: 'relative', zIndex: 1,
      }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <LogoSVG />
          <div style={{ fontSize: '28px', fontWeight: '800', color: '#fff', marginTop: '12px', letterSpacing: '-0.5px' }}>Stasha</div>
          <div style={{ fontSize: '10px', color: '#D3906C', letterSpacing: '2.5px', marginTop: '4px', fontWeight: '600' }}>PLAN. FOCUS. ACHIEVE.</div>
        </div>

        <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#fff', marginBottom: '20px', textAlign: 'center' }}>
          {mode === 'login' && 'Welcome back'}
          {mode === 'register' && 'Create your account'}
          {mode === 'forgot' && 'Reset your password'}
          {mode === 'reset' && 'Set new password'}
        </h2>

        {/* Error */}
        {error && (
          <div style={{
            background: 'rgba(224,85,85,0.2)', color: '#ffb3b3', padding: '12px 16px',
            borderRadius: '10px', fontSize: '13px', marginBottom: '16px',
            fontWeight: '500', border: '1px solid rgba(224,85,85,0.3)',
          }}>{error}</div>
        )}

        {/* Success */}
        {success && (
          <div style={{
            background: 'rgba(76,175,80,0.2)', color: '#a5d6a7', padding: '12px 16px',
            borderRadius: '10px', fontSize: '13px', marginBottom: '16px',
            fontWeight: '500', border: '1px solid rgba(76,175,80,0.3)',
          }}>✓ {success}</div>
        )}

        {/* LOGIN FORM */}
        {mode === 'login' && (
          <>
            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyle}>EMAIL ADDRESS</label>
              <input style={inputStyle} placeholder="mutsa@student.ac.bw" type="email"
                value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            </div>
            <div style={{ marginBottom: '8px' }}>
              <label style={labelStyle}>PASSWORD</label>
              <input style={inputStyle} placeholder="••••••••" type="password"
                value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
            </div>
            <div style={{ textAlign: 'right', marginBottom: '24px' }}>
              <span onClick={() => { setMode('forgot'); setError('') }} style={{
                fontSize: '13px', color: '#D3906C', fontWeight: '600', cursor: 'pointer',
              }}>Forgot password?</span>
            </div>
            <button onClick={handleLogin} disabled={loading} style={{
              width: '100%', background: 'linear-gradient(135deg, #D3906C, #bf7d5a)',
              color: '#fff', border: 'none', padding: '14px', borderRadius: '10px',
              fontSize: '15px', fontWeight: '700', cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(211,144,108,0.4)',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              opacity: loading ? 0.7 : 1,
            }}>{loading ? 'Please wait...' : 'Login'}</button>
            <p style={{ textAlign: 'center', fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginTop: '20px' }}>
              Don't have an account?{' '}
              <span onClick={() => { setMode('register'); setError('') }} style={{ color: '#D3906C', fontWeight: '700', cursor: 'pointer' }}>Register</span>
            </p>
          </>
        )}

        {/* REGISTER FORM */}
        {mode === 'register' && (
          <>
            <div style={{ marginBottom: '14px' }}>
              <label style={labelStyle}>FULL NAME</label>
              <input style={inputStyle} placeholder="e.g. Mutsa"
                value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            </div>
            <div style={{ marginBottom: '14px' }}>
              <label style={labelStyle}>EMAIL ADDRESS</label>
              <input style={inputStyle} placeholder="mutsa@student.ac.bw" type="email"
                value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            </div>
            <div style={{ marginBottom: '14px' }}>
              <label style={labelStyle}>PASSWORD</label>
              <input style={inputStyle} placeholder="••••••••" type="password"
                value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
            </div>
            <div style={{ marginBottom: '14px' }}>
              <label style={labelStyle}>SECURITY QUESTION</label>
              <select style={{ ...inputStyle, cursor: 'pointer' }}
                value={form.securityQuestion}
                onChange={e => setForm({ ...form, securityQuestion: e.target.value })}>
                {SECURITY_QUESTIONS.map(q => <option key={q} value={q}>{q}</option>)}
              </select>
            </div>
            <div style={{ marginBottom: '24px' }}>
              <label style={labelStyle}>SECURITY ANSWER</label>
              <input style={inputStyle} placeholder="Your answer..."
                value={form.securityAnswer} onChange={e => setForm({ ...form, securityAnswer: e.target.value })} />
            </div>
            <button onClick={handleRegister} disabled={loading} style={{
              width: '100%', background: 'linear-gradient(135deg, #D3906C, #bf7d5a)',
              color: '#fff', border: 'none', padding: '14px', borderRadius: '10px',
              fontSize: '15px', fontWeight: '700', cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(211,144,108,0.4)',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              opacity: loading ? 0.7 : 1,
            }}>{loading ? 'Please wait...' : 'Create Account'}</button>
            <p style={{ textAlign: 'center', fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginTop: '20px' }}>
              Already have an account?{' '}
              <span onClick={() => { setMode('login'); setError('') }} style={{ color: '#D3906C', fontWeight: '700', cursor: 'pointer' }}>Login</span>
            </p>
          </>
        )}

        {/* FORGOT PASSWORD FORM */}
        {mode === 'forgot' && (
          <>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', marginBottom: '20px', textAlign: 'center' }}>
              Enter your email and we'll ask you a security question to reset your password.
            </p>
            <div style={{ marginBottom: '24px' }}>
              <label style={labelStyle}>EMAIL ADDRESS</label>
              <input style={inputStyle} placeholder="mutsa@student.ac.bw" type="email"
                value={forgotEmail} onChange={e => setForgotEmail(e.target.value)} />
            </div>
            <button onClick={handleForgot} disabled={loading} style={{
              width: '100%', background: 'linear-gradient(135deg, #D3906C, #bf7d5a)',
              color: '#fff', border: 'none', padding: '14px', borderRadius: '10px',
              fontSize: '15px', fontWeight: '700', cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(211,144,108,0.4)',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              opacity: loading ? 0.7 : 1,
            }}>{loading ? 'Please wait...' : 'Continue'}</button>
            <p style={{ textAlign: 'center', fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginTop: '20px' }}>
              <span onClick={() => { setMode('login'); setError('') }} style={{ color: '#D3906C', fontWeight: '700', cursor: 'pointer' }}>← Back to login</span>
            </p>
          </>
        )}

        {/* RESET PASSWORD FORM */}
        {mode === 'reset' && (
          <>
            <div style={{
              background: 'rgba(255,255,255,0.08)', borderRadius: '10px',
              padding: '12px 16px', marginBottom: '20px',
              border: '1px solid rgba(255,255,255,0.15)',
            }}>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginBottom: '4px', letterSpacing: '0.5px' }}>SECURITY QUESTION</div>
              <div style={{ fontSize: '14px', color: '#fff', fontWeight: '500' }}>{securityQuestion}</div>
            </div>
            <div style={{ marginBottom: '14px' }}>
              <label style={labelStyle}>YOUR ANSWER</label>
              <input style={inputStyle} placeholder="Your answer..."
                value={resetForm.securityAnswer}
                onChange={e => setResetForm({ ...resetForm, securityAnswer: e.target.value })} />
            </div>
            <div style={{ marginBottom: '14px' }}>
              <label style={labelStyle}>NEW PASSWORD</label>
              <input style={inputStyle} placeholder="••••••••" type="password"
                value={resetForm.newPassword}
                onChange={e => setResetForm({ ...resetForm, newPassword: e.target.value })} />
            </div>
            <div style={{ marginBottom: '24px' }}>
              <label style={labelStyle}>CONFIRM NEW PASSWORD</label>
              <input style={inputStyle} placeholder="••••••••" type="password"
                value={resetForm.confirmPassword}
                onChange={e => setResetForm({ ...resetForm, confirmPassword: e.target.value })} />
            </div>
            <button onClick={handleReset} disabled={loading} style={{
              width: '100%', background: 'linear-gradient(135deg, #D3906C, #bf7d5a)',
              color: '#fff', border: 'none', padding: '14px', borderRadius: '10px',
              fontSize: '15px', fontWeight: '700', cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(211,144,108,0.4)',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              opacity: loading ? 0.7 : 1,
            }}>{loading ? 'Please wait...' : 'Reset Password'}</button>
            <p style={{ textAlign: 'center', fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginTop: '20px' }}>
              <span onClick={() => { setMode('login'); setError('') }} style={{ color: '#D3906C', fontWeight: '700', cursor: 'pointer' }}>← Back to login</span>
            </p>
          </>
        )}

      </div>
    </div>
  )
}

export default Login