import React, { useState } from 'react'
import AppButton from '../../components/AppButton'
import withModal from '../../components/withModal'

interface LoginFormProps {
  onLogin: (oidcIssuer: string) => void
}

const LoginButton = ({ ...props }) => <AppButton {...props}>Login</AppButton>

const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [idp, setIdp] = useState(
    localStorage.getItem('idp') ?? 'https://solidcommunity.net',
  )

  const onSubmit: React.FormEventHandler = e => {
    e.preventDefault()
    localStorage.setItem('idp', idp)
    onLogin(idp)
  }

  const onChangeInput = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault()
    const newValue = e.currentTarget.value
    setIdp(newValue)
  }
  return (
    <form onSubmit={onSubmit}>
      <div className="field">
        <div className="control">
          <input
            id="idp"
            className="input"
            type="url"
            value={idp}
            onChange={onChangeInput}
            placeholder="Where is your Solid Pod?"
          />
        </div>
      </div>
      <div className="field">
        <div className="control">
          <input type="submit" value="Connect" className="button is-link" />
        </div>
      </div>
    </form>
  )
}

const LoginPrompt = withModal(
  LoginButton,
  LoginForm,
  'Select your Solid identity provider',
)

export default LoginPrompt
