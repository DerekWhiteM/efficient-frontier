import React from 'react'
import { getFromStorage, setInStorage } from '../storage'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'

const Navigation = (props) => {

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
      props.logout()
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

  /*return (
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
  )*/

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
    <Navbar.Brand href="/">Portfolio Builder</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        <NavDropdown title="Account" id="basic-nav-dropdown">
          <NavDropdown.Item 
            onClick={
              () => {
                if (getFromStorage('guest')) {
                  setInStorage('guest', false)
                  deleteAccount()
                } else { logout() }
              }
            }
            >Logout
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={deleteAccount}>Delete</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
    </Navbar>
  )
  
}

export default Navigation