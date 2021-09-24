import React from 'react'
import LoginPrompt from './LoginPrompt'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { login, logout, selectLoginStatus, selectSession } from './loginSlice'

interface Props {
  className?: string
}

const Login: React.FC<Props> = (
  { className, ...props }: Props = { className: '' },
) => {
  const dispatch = useAppDispatch()
  const info = useAppSelector(selectSession)
  const status = useAppSelector(selectLoginStatus)

  const commonProps = {
    ...props,
    className: `${className} button`,
  }

  return status === 'loading' ? (
    <button {...commonProps} disabled>
      Loading
    </button>
  ) : info.isLoggedIn ? (
    <button {...commonProps} onClick={() => dispatch(logout())}>
      {info.webId} Logout
    </button>
  ) : (
    <LoginPrompt
      {...commonProps}
      onLogin={oidcIssuer => dispatch(login(oidcIssuer))}
    />
  )
}

export default Login
