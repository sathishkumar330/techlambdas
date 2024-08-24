import React from 'react'
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './components/Login.js'
import Employee from './components/Employee.js'


const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route exact path='/' Component={Login}/>
        <Route exact path='/employee' Component={Employee}/>
        </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App