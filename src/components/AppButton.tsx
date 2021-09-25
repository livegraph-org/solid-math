/** These are the main buttons of the application */

import React from 'react'
import styled from 'styled-components'
import classNames from 'classnames'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button className={classNames(className, 'button')} {...props}>
      {children}
    </button>
  )
}

const AppButton = styled(Button)`
  &:not(:hover) {
    background-color: #0000;
    border-color: #0000;
    color: #fff;
  }
  &:hover {
  }
  &:active {
    background-color: #eee;
  }
`

export default AppButton
