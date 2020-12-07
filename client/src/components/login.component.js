import React, { useState } from 'react'
import { setInStorage } from '../storage.js'
import host from '../host'

const Login = (props) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [signUp, setSignUp] = useState(false)

    const title = () => { if (signUp) { return 'Sign Up' } else { return 'Log In' } }

    const message = () => {
        const style = {textAlign: "center"}
        if (signUp) { return (
            <p style={style}>
                Already have an account?<br />
                <a href="/#" onClick={() => { setSignUp(false) }}> Log In</a>
            </p>
        )} else { return (
            <p style={style}>
                Don't have an account?<br/>
                <a href="/#" onClick={() => { setSignUp(true) }}>Sign Up </a> | <a href="/#" onClick={handleGuest}>Use Demo</a>
            </p>
        )}
    }

    const handleSubmit = () => {   
        if (signUp) {
            fetch(host + '/account/register', { 
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
                setInStorage('guest', true)
                props.login()
            })
        } else {
            fetch(host + '/account/signin', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    username: username,
                    password: password,
                })
            })
            .then(res => { return res.json() })
            .then(res => {
                if (res.success === true) {
                    setInStorage('token', res.token)
                    setInStorage('user', res.user)
                    setInStorage('username', username)
                    props.login()
                } else {
                    console.log('Login failed')
                }
            })
        }
    }

    const handleGuest = () => {
        fetch(host + '/account/guest', { method: 'GET' })
        .then(res => { return res.json() })
        .then(res => {
            setInStorage('token', res.token)
            setInStorage('user', res.user)
            setInStorage('guest', true)
            props.login()
        })   
    }

    return (
        <div className="inner-login">
            <h1 style={{textAlign: "center"}}>{ title() }</h1>
            <br/>
            <input style={{display: "block", marginLeft: "auto", marginRight: "auto", marginBottom: "3px"}} type="text" placeholder="Username" name="username" value={username} onChange={e => setUsername(e.target.value)}/>
            <input style={{display: "block", marginLeft: "auto", marginRight: "auto"}} type="password" placeholder="Password" name="password" value={password} onChange={e => setPassword(e.target.value)}/><br/>
            <button style={{display: "block", marginLeft: "auto", marginRight: "auto"}} className="btn btn-secondary" onClick={handleSubmit}>Submit</button><br/>
            { message() }
        </div> 
    )
    
}

export default Login