import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {getFromStorage, setInStorage} from '../storage.js'

const Login = (setIsLoading) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        fetch('/account/signin', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: username,
                password: password,
            })
        })
        .then(res => { return res.json() })
        .then(res => {
            setInStorage('token', res.token)
            setInStorage('user', res.user)
            console.log('Login: ' + getFromStorage('user'))
            setInStorage('username', username)
            console.log(res)
            setIsLoading(false)
        })
    }

    const handleGuest = () => {
        fetch('/account/guest', { method: 'GET' })
            .then(res => { return res.json() })
            .then(res => {
                setInStorage('token', res.token)
                setInStorage('user', res.user)
                setInStorage('guest', true)
                setIsLoading(false)
            })   
    }

    return (
        <div className="inner-login">
            <h1 style={{textAlign: "center"}}>Log in</h1><br/>
            <input style={{display: "block", marginLeft: "auto", marginRight: "auto", marginBottom: "3px"}} type="text" placeholder="Username" name="username" value={username} onChange={e => setUsername(e.target.value)}/>
            <input style={{display: "block", marginLeft: "auto", marginRight: "auto"}} type="password" placeholder="Password" name="password" value={password} onChange={e => setPassword(e.target.value)}/><br/>
            <button style={{display: "block", marginLeft: "auto", marginRight: "auto"}} className="btn btn-secondary" onClick={handleSubmit}>Submit</button><br/>
            <p style={{textAlign: "center"}}>Don't have an account?<br/>
                <Link to="/register" className="nav-link">Sign Up</Link> or continue as&nbsp;
                <a href="/#" onClick={handleGuest}>Guest</a>
            </p>
        </div>
    )
    
}

export default Login