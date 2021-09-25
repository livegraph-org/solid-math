import React from 'react'
import AppButton from '../../components/AppButton'

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
    <AppButton
      onClick={() => alert('adding documents and math not implemented')}
    >
      <i className="icon icon-plus" aria-label="add" />
    </AppButton>
  </div>
)

export default ControlPanel
