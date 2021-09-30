import React from 'react'
import AppButton from '../../components/AppButton'
import AddButtonWithMenu from './AddButtonWithMenu'
import DocumentControl from './DocumentControl'

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

    <DocumentControl />

    <AddButtonWithMenu
      buttonProps={{}}
      menuProps={{
        onAddMath: () => console.log('add math'),
      }}
    />
  </div>
)

export default ControlPanel
