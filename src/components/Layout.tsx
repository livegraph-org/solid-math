import React from 'react'
import Login from '../features/login/Login'
import VisualizationContainer from '../features/math/visualization/VisualizationContainer'
import styled from 'styled-components'
import About from './About'
import ControlPanel from '../features/control/ControlPanel'
import Search from '../features/search/Search'
import Info from '../features/info/Info'

const PositionedAbout = styled(About)`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
`

const PositionedInfo = styled(Info)`
  position: fixed;
  bottom: 0.5rem;
  left: 0.5rem;
`

const FullSizeVisualization = styled(VisualizationContainer)`
  height: 100vh;
  width: 100vw;
  display: block;
`

const TopNav = styled.nav`
  display: flex;
  position: absolute;
  width: 100%;
  pointer-events: none;
  justify-content: space-between;
  & > * {
    pointer-events: all;
  }
  padding: 1rem;
`

const Layout: React.FC = () => {
  return (
    <>
      <TopNav>
        <ControlPanel />
        <div style={{ display: 'flex' }}>
          <Search
            style={{
              display: 'inline-block',
              position: 'relative',
              zIndex: 2,
            }}
          />
          <Login />
        </div>
      </TopNav>

      <PositionedAbout />

      <PositionedInfo />

      <FullSizeVisualization />
    </>
  )
}

export default Layout
