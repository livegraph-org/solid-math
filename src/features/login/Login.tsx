import React, { useState } from 'react'
import LoginPrompt from './LoginPrompt'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { login, logout, selectLoginStatus, selectSession } from './loginSlice'
import AppButton from '../../components/AppButton'
import classNames from 'classnames'
import styled from 'styled-components'

interface User {
  webId: string
}

const ListItem = styled.li`
  display: flex;
  background-color: white;
  > * {
    flex: auto;
    padding: 0.5rem;
    border: none;
    background-color: white;
    &:hover {
      background-color: whitesmoke;
    }
  }
`

const UserMenu = ({
  user,
  onLogout,
  className,
  ...props
}: {
  user: User
  onLogout: () => void
  className?: string
}) => {
  const [open, setOpen] = useState(false)

  return (
    <div
      {...props}
      className={classNames(className)}
      style={{
        position: 'relative',
        flexDirection: 'column',
        display: 'inline-flex',
        alignItems: 'end',
        zIndex: 3,
      }}
      onMouseLeave={() => setOpen(false)}
      onBlur={event => {
        // https://stackoverflow.com/a/60094794
        // make sure the blur works when leaving the whole thing only
        if (!event.currentTarget.contains(event.relatedTarget as Node)) {
          setOpen(false)
        }
      }}
    >
      <AppButton
        onMouseEnter={() => setOpen(true)}
        onFocus={() => setOpen(true)}
      >
        <i className="icon icon-user" />
      </AppButton>
      {open && (
        <div style={{ position: 'relative', width: 0, height: 0 }}>
          <div
            className="box p-0"
            style={{ position: 'absolute', right: 0, overflow: 'hidden' }}
          >
            <div className="menu box p-0">
              <ul className="menu-list">
                <ListItem>
                  <span>{user.webId}</span>
                </ListItem>
                <ListItem>
                  <button className="button" onClick={onLogout}>
                    Logout
                  </button>
                </ListItem>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const Login = ({ ...props }) => {
  const dispatch = useAppDispatch()
  const info = useAppSelector(selectSession)
  const status = useAppSelector(selectLoginStatus)

  return status === 'loading' ? (
    <AppButton {...props} disabled>
      <i className="icon icon-spinner animate-pulse" />
    </AppButton>
  ) : info.isLoggedIn ? (
    <UserMenu user={info} {...props} onLogout={() => dispatch(logout())} />
  ) : (
    <LoginPrompt
      {...props}
      onLogin={oidcIssuer => dispatch(login(oidcIssuer))}
    />
  )
}

export default Login
