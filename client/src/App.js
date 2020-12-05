import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { getFromStorage } from './storage'

import Navigation from './components/navbar.component'
import AssetsList from './components/assets-list.component'
import Login from './components/login.component'

const App = () => {
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const storedToken = getFromStorage('token')
    if (storedToken) {
      fetch('https://efficient-portfolio.herokuapp.com/account/verify?token=' + storedToken, { method: 'GET' })
      .then(res => res.json())
      .then(res => { if (res.success) {setIsLoading(false)} })
    }
  }, [])
  return (
    <div>
      <Navigation logout={() => setIsLoading(true)}/>
      <br />
      { isLoading ? <Login login={ () => setIsLoading(false)} /> : <AssetsList /> }
    </div>
  )
}

export default App