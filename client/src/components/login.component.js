import React, { useEffect, useState } from 'react'
import { setInStorage } from '../storage.js'

const Login = (props) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [signUp, setSignUp] = useState(false)
    const [loginFail, setLoginFail] = useState(false)

    useEffect(() => { if (signUp) {setLoginFail(false)} })

    const title = () => { if (signUp) { return 'Sign Up' } else { return 'Log In' } }

    const message = () => {
        const style = {textAlign: "center"}
        if (signUp) { return (
            <p style={style}>
                Already have an account?<br />
                <a href="/#" onClick={() => {setSignUp(false)}}> Log In</a>
            </p>
        )} else { return (
            <p style={style}>
                Don't have an account?<br/>
                <a href="/#" onClick={() => setSignUp(true)}>Sign Up </a> | <a href="/#" onClick={() => handleGuest()}>Use Demo</a>
            </p>
        )}
    }

    const handleSubmit = () => {  
        setLoginFail(false) 
        if (signUp) {
            fetch('/account/register', { 
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
                if (res.success === true) {
                    setInStorage('token', res.token)
                    setInStorage('user', res.user)
                    setInStorage('username', username)
                    props.login()
                } else {
                    setLoginFail(true)
                    console.log('Login failed')
                }
            })
        }
    }

    const handleGuest = () => {
        fetch('/account/guest', { method: 'GET' })
        .then(res => { return res.json() })
        .then(res => {
            setInStorage('token', res.token)
            setInStorage('user', res.user)
            setInStorage('guest', true)
            props.login()
        })   
    }

    const loginMessage = () => {
        if(loginFail) { 
            return <p style={{textAlign: "center"}}>Login Failed</p> 
        }
    }

    return (
        <div className="inner-login">
            <h1 style={{textAlign: "center"}}>{ title() }</h1>
            <br/>
            <input style={{display: "block", marginLeft: "auto", marginRight: "auto", marginBottom: "3px"}} type="text" placeholder="Username" name="username" value={username} onChange={e => setUsername(e.target.value)}/>
            <input style={{display: "block", marginLeft: "auto", marginRight: "auto"}} type="password" placeholder="Password" name="password" value={password} onChange={e => setPassword(e.target.value)}/><br/>
            { loginMessage() }
            <button style={{display: "block", marginLeft: "auto", marginRight: "auto"}} className="btn btn-secondary" onClick={handleSubmit}>Submit</button><br/>
            { message() }
        </div> 
    )
    
}

export default Login