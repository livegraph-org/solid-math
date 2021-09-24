import React, { useEffect } from 'react'
import Layout from './components/Layout'
import { init as initLogin } from './features/login/loginSlice'
import { useAppDispatch } from './app/hooks'

const App: React.FC = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(initLogin())
  }, [dispatch])

  return <Layout />
}

export default App
