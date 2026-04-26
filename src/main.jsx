import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { Aboutus } from './aboutUs.jsx'
import { RegisterAcc } from './CreateAccount.jsx'
import { Signin } from './Signin.jsx'
import { Dashboard } from './dashboard/dashboard.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <App />}/>
        <Route path='/AboutUs' element={ < Aboutus />}/>
        <Route path='/Register' element={ <RegisterAcc />}/>
        <Route path='/signin' element={ <Signin />}/>
        <Route path='/dashboard' element={ <Dashboard />}/>
      </Routes>
    </BrowserRouter>
   
  </StrictMode>,
)
