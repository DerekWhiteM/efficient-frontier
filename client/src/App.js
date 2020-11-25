import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter as Router, Route} from 'react-router-dom'

import Navbar from './components/navbar.component'
import Home from './components/home.component'
import Login from './components/login.component'
import Register from './components/register.component'
import Dataset from './components/dataset.component'

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <br/>
        <Route path="/" exact component={Home} />
        <Route path="/dataset" component={Dataset} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </div>
    </Router>
  )
}

export default App