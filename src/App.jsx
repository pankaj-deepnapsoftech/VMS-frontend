import React from 'react'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import { Outlet } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import { Toaster } from 'react-hot-toast';

const App = () => {

  return (
    <>
      <Toaster position='top-right' />
      <AppRoutes />
    </>
  )
}

export default App;