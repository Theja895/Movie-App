import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'

const Login = () => {
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [showUsername, setShowUsername] = useState(true)
  const [showPassword, setShowPassword] = useState(false)

  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async event => {
    event.preventDefault()

    if (!username.trim() || !password.trim()) {
      setErrorMessage('Please enter username and password')
      return
    }

    try {
      setIsLoading(true)
      setErrorMessage('')

      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      })

      const data = await response.json()

      console.log('Login response:', data)

      if (!response.ok) {
        throw new Error(
          data.error_msg ||
          data.message ||
          'Login failed'
        )
      }

      localStorage.setItem(
        'jwt_token',
        data.jwt_token
      )

      navigate('/home')
    } catch (error) {
      console.error('Login error:', error)
      setErrorMessage(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">

        <h1>Movies App</h1>

        <p className="login-subtitle">
          Login to continue
        </p>

        <form onSubmit={handleLogin}>

          {/* Username */}
          <label>USERNAME</label>

          <div className="input-wrapper">
            <input
              type={showUsername ? 'text' : 'password'}
              value={username}
              onChange={event =>
                setUsername(event.target.value)
              }
              placeholder="Enter Username"
            />

            <button
              type="button"
              className="eye-button"
              onClick={() =>
                setShowUsername(!showUsername)
              }
            >
              {showUsername ? '👁' : '🙈'}
            </button>
          </div>

          {/* Password */}
          <label>PASSWORD</label>

          <div className="input-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={event =>
                setPassword(event.target.value)
              }
              placeholder="Enter Password"
            />

            <button
              type="button"
              className="eye-button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
            >
              {showPassword ? '👁' : '🙈'}
            </button>
          </div>

          {errorMessage && (
            <p className="login-error">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>

        </form>
      </div>
    </div>
  )
}

export default Login