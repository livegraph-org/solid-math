import React from 'react'
import LoginPrompt from './LoginPrompt'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { login, logout, selectLoginStatus, selectSession } from './loginSlice'
import AppButton from '../../components/AppButton'
import withMenu from '../../components/withMenu'

interface User {
  webId: string
}

const Menu = ({ user, onLogout }: { user: User; onLogout: () => void }) => (
  <div className="menu box p-0">
    <ul className="menu-list">
      <li>
        <a className="disabled">{user.webId}</a>
      </li>
      <li>
        <a onClick={onLogout}>Logout</a>
      </li>
    </ul>
  </div>
)

const UserButton = ({ ...props }) => (
  <AppButton {...props}>
    <i className="icon icon-user" />
  </AppButton>
)

const UserWithMenu = withMenu(UserButton, Menu)

const Login = ({ ...props }) => {
  const dispatch = useAppDispatch()
  const info = useAppSelector(selectSession)
  const status = useAppSelector(selectLoginStatus)

  return status === 'loading' ? (
    <AppButton {...props} disabled>
      <i className="icon icon-spinner animate-pulse" />
    </AppButton>
  ) : info.isLoggedIn ? (
    <UserWithMenu
      menuProps={{ user: info, onLogout: () => dispatch(logout()) }}
      buttonProps={props}
    />
  ) : (
    <LoginPrompt
      {...props}
      contentProps={{
        onLogin: (oidcIssuer: string) => {
          dispatch(login(oidcIssuer))
        },
      }}
      buttonProps={{}}
    />
  )
}

export default Login
