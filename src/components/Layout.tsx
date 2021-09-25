import React from 'react'
import Login from '../features/login/Login'
import VisualizationContainer from '../features/math/visualization/VisualizationContainer'
import styled from 'styled-components'
import About from './About'
import ControlPanel from '../features/control/ControlPanel'

const PositionedLogin = styled(Login)`
  position: fixed;
  top: 1rem;
  right: 1rem;
  display: block;
`

const PositionedAbout = styled(About)`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
`

const PositionedControlPanel = styled(ControlPanel)`
  position: fixed;
  top: 1rem;
  left: 1rem;
`

const FullSizeVisualization = styled(VisualizationContainer)`
  height: 100vh;
  width: 100vw;
  display: block;
`

const Layout: React.FC = () => {
  return (
    <>
      <PositionedLogin />

      <PositionedAbout />

      <PositionedControlPanel />

      <FullSizeVisualization />
    </>
  )
}

export default Layout
