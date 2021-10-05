import React from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import AppButton from '../../components/AppButton'
import { selectIsLoggedIn } from '../login/loginSlice'
import { createMath } from '../math/mathSlice'
import AddButtonWithMenu from './AddButtonWithMenu'
import DocumentControl from './DocumentControl'

const ControlPanel: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  ...props
}) => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  return (
    <div {...props}>
      <AppButton
        aria-label="people"
        onClick={() => alert('people control not implemented')}
      >
        <i className="icon icon-users" />
      </AppButton>

      <DocumentControl />

      {isLoggedIn && (
        <AddButtonWithMenu
          buttonProps={{}}
          menuProps={{
            onAddMath: () => dispatch(createMath(true)),
          }}
        />
      )}
    </div>
  )
}

export default ControlPanel
