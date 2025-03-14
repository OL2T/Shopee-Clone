import { ToastContainer } from 'react-toastify'
import useRouteElement from './useRouteElement'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const routeElements = useRouteElement()
  return (
    <>
      <div className='bg-neutral-100'>
        {routeElements}
        <ToastContainer />
      </div>
    </>
  )
}

export default App
