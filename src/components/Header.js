import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {getAuthToken, removeAuthToken} from '../utils/auth' // Import utility functions for authentication
import 'Header.css'

class Header extends Component {
  handleLogoClick = () => {
    // Navigate to the Home route
    this.props.history.push('/home')
  }

  handleLogout = () => {
    // Clear authentication token and navigate to Login route
    removeAuthToken() // Assuming this function removes the token from local storage or context
    this.props.history.push('/login')
  }

  render() {
    const {location} = this.props
    const currentPath = location.pathname

    return (
      <header className="header">
        <div className="logo" onClick={this.handleLogoClick}>
          <img
            src="/https://res.cloudinary.com/dm5ihvf8p/image/upload/v1724743721/Frame_8004_2_iab95q.png"
            alt="Website Logo"
          />
        </div>
        {(currentPath === '/home' ||
          currentPath === '/assessment' ||
          currentPath === '/results') && (
          <button className="logout-button" onClick={this.handleLogout}>
            Logout
          </button>
        )}
      </header>
    )
  }
}

export default withRouter(Header)
