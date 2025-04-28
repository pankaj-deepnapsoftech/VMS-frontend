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