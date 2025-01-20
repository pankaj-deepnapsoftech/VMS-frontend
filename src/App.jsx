import React from 'react'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import { Outlet } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'

const App = () => {
 
  return (
   <>
   
   <AppRoutes/>
   </>
  )
}

export default App;