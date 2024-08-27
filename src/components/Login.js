import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import {useAuth} from '../context/AuthContext'

const Login = () => {
  const [credentials, setCredentials] = useState({username: '', password: ''})
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const {setIsAuthenticated} = useAuth()
  const history = useHistory()

  const handleInputChange = e => {
    const {name, value} = e.target
    setCredentials({...credentials, [name]: value})
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const response = await fetch('https://apis.ccbp.in/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })

      const result = await response.json()

      if (response.ok) {
        setIsAuthenticated(true)
        history.push('/home')
      } else {
        setError(result.message)
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <img
          src="https://res.cloudinary.com/dm5ihvf8p/image/upload/v1724743979/Frame_8787_edjsie.png"
          alt="login website logo"
        />
        <input
          type="text"
          name="username"
          value={credentials.username}
          onChange={handleInputChange}
          placeholder="Username"
        />
        <input
          type={showPassword ? 'text' : 'password'}
          name="password"
          value={credentials.password}
          onChange={handleInputChange}
          placeholder="Password"
        />
        <label>
          <input
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
          Show Password
        </label>
        <button type="submit">Login</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  )
}

export default Login
