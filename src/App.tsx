import { ToastContainer } from 'react-toastify'
import useRouteElement from './useRouteElement'
import 'react-toastify/dist/ReactToastify.css'
import { useEffect } from 'react'
import { localStorageEventTarget } from './types/auth'
import { useReset } from './stores'

function App() {
  const reset = useReset()
  const routeElements = useRouteElement()

  useEffect(() => {
    localStorageEventTarget.addEventListener('clearLocalStorage', reset)

    return () => {
      localStorageEventTarget.removeEventListener('clearLocalStorage', reset)
    }
  }, [reset])

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
