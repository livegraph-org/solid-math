import React from 'react'
import styled from 'styled-components'

const ICOutside = styled.div`
  position: fixed;
  width: 100%;
  top: 0;
  bottom: 0;
  pointer-events: none;
  overflow-x: hidden;
  overflow-y: auto;
`
const ICInside = styled.div`
  pointer-events: all;
  overflow-x: auto;
  width: 100%;
`

const InfoContainer = ({ children }: { children: React.ReactNode }) => (
  <ICOutside>
    <div className="columns mr-1 mt-6">
      <div className="column is-one-quarter is-offset-three-quarters">
        <ICInside>{children}</ICInside>
      </div>
    </div>
  </ICOutside>
)

export default InfoContainer
