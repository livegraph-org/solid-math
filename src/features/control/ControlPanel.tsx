import React from 'react'
import AppButton from '../../components/AppButton'

const ControlPanel: React.FC = ({ ...props }) => (
  <div {...props}>
    <AppButton aria-label="people">
      <i className="icon icon-users" />
    </AppButton>
    <AppButton>
      <i className="icon icon-document" aria-label="documents" />
    </AppButton>
    <AppButton>
      <i className="icon icon-plus" aria-label="add" />
    </AppButton>
  </div>
)

export default ControlPanel
