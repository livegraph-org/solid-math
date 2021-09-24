import React, { useEffect } from 'react'
import Layout from './components/Layout'
import DataContainer from './components/DataContainer'
import { init as initLogin } from './features/login/loginSlice'
import { useAppDispatch } from './app/hooks'

const App: React.FC = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(initLogin())
  }, [dispatch])

  return (
    <DataContainer>
      <Layout />
    </DataContainer>
  )
}

export default App
