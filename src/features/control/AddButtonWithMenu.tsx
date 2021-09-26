import React from 'react'
import withMenu from '../../components/withMenu'
import AppButton from '../../components/AppButton'

const AddButton = ({ ...props }) => (
  <AppButton {...props}>
    <i className="icon icon-plus" aria-label="add" />
  </AppButton>
)

interface MenuProps {
  onAddDocument: () => void
  onAddMath: () => void
}

const Menu = ({ onAddDocument, onAddMath }: MenuProps) => (
  <div className="menu box p-0">
    <ul className="menu-list">
      <li>
        <a onClick={onAddDocument}>Add Document</a>
      </li>
      <li>
        <a onClick={onAddMath}>Add Math</a>
      </li>
    </ul>
  </div>
)

const AddButtonWithMenu = withMenu<Record<string, never>, MenuProps>(
  AddButton,
  Menu,
)

export default AddButtonWithMenu
