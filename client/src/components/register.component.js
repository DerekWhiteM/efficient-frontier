import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {setInStorage} from '../storage.js'

const Register = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = () => {
        fetch('/account/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: username,
                password: password,
            })
        })
        .then(res => {
            return res.json()
        })
        .then(res => {
            fetch('/account/signin', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    username: username,
                    password: password,
                })
            })
            .then(res => {
                return res.json()
            })
            .then(res => {
                setInStorage('token', res.token)
                setInStorage('user', res.user)
                setInStorage('username', username)
                setTimeout(() => {
                    window.location = "/"
                }, 1000)
            })
        })
    }

    return (
        <div className="inner-login">
            <h1 style={{textAlign: "center"}}>Sign up</h1><br/>
            <input style={{display: "block", marginLeft: "auto", marginRight: "auto", marginBottom: "3px"}} type="text" placeholder="Username" name="username" value={username} onChange={e => setUsername(e.target.value)}/>
            <input style={{display: "block", marginLeft: "auto", marginRight: "auto"}} type="password" placeholder="Password" name="password" value={password} onChange={e => setPassword(e.target.value)}/><br/>
            <button style={{display: "block", marginLeft: "auto", marginRight: "auto"}} className="btn btn-secondary" onClick={handleSubmit}>Submit</button><br/>
            <p style={{textAlign: "center"}}>Already have an account? <Link to="/login" className="nav-link">Log in</Link></p>
        </div>
    )
    
}

export default Register