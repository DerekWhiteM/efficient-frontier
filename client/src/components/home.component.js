import React, { useState, useEffect } from 'react'
import Login from './login.component'
import AssetList from './assets-list.component'
import { getFromStorage } from '../storage'
import Navigation from './navbar.component'

const Home = () => {
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const storedToken = getFromStorage('token')
    if (storedToken) {
      fetch('/account/verify?token=' + storedToken, { method: 'GET' })
      .then(res => res.json())
      .then(res => { if (res.success) {setIsLoading(false)} })
    }
  }, [])
  return (
    <div>
      <Navigation logout={() => setIsLoading(true)}/>
      <br />
      { isLoading ? <Login login={() => setIsLoading(false)} /> : <AssetList /> }
    </div>
  )
}

export default Home