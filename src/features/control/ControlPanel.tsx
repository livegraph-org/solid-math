import React from 'react'
import AppButton from '../../components/AppButton'
import AddButtonWithMenu from './AddButtonWithMenu'

const ControlPanel: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  ...props
}) => (
  <div {...props}>
    <AppButton
      aria-label="people"
      onClick={() => alert('people control not implemented')}
    >
      <i className="icon icon-users" />
    </AppButton>
    <AppButton onClick={() => alert('document control not implemented')}>
      <i className="icon icon-document" aria-label="documents" />
    </AppButton>

    <AddButtonWithMenu
      buttonProps={{}}
      menuProps={{
        onAddDocument: () => console.log('add document'),
        onAddMath: () => console.log('add math'),
      }}
    />
  </div>
)

export default ControlPanel
