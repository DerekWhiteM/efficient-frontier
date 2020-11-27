import React from 'react'
import { Link } from 'react-router-dom'
import { getFromStorage, setInStorage } from '../storage'

const Navbar = () => {

  const logout = () => {
    fetch('/account/logout', {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        token: getFromStorage('token')
      })
    })
    .then(res => { return res.json() })
    .then(res => {
      if (res.isGuest === true) {
        deleteAccount()
      }
      window.location = "/"
    })
  }

  const deleteAccount = () => {
    fetch('/account/delete', {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        user_id: getFromStorage('user')
      })
    })
    .then(res => {
        logout()
        return res.json()
    })
  }

  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      <div className="container" style={{position: 'relative'}}>
        <Link to="/" className="navbar-brand">Portfolio Builder</Link>
        
        <ul className="navbar-nav navigation">
          <Link to="/register" className="nav-link">Sign Up</Link>
          <Link to="/login" className="nav-link">Log In</Link>
          <button onClick={() => {
            if (getFromStorage('guest')) {
              setInStorage('guest', false)
              deleteAccount()
            } else {
              logout()
            }
          }}>Logout</button>
          <button onClick={deleteAccount}>Delete Account</button>
        </ul>
      </div>
    </nav>
  )
  
}

export default Navbar