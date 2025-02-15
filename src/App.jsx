import React, { useEffect } from 'react'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import { Outlet } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import { Toaster } from 'react-hot-toast';
import Loader from './components/Loader/Loader'
import { useAuthContext } from './context'

const App = () => {
  const { userLoading } = useAuthContext();



  if (userLoading) {
    return <Loader />
  }



  return (
    <>
      <Toaster position='top-right' />
      <AppRoutes />
    </>
  )
}

export default App;