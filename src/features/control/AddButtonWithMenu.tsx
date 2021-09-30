import React from 'react'
import withMenu from '../../components/withMenu'
import AppButton from '../../components/AppButton'
import withModal from '../../components/withModal'
import AddDocument from '../document/AddDocument'

const AddButton = ({ ...props }) => (
  <AppButton {...props}>
    <i className="icon icon-plus" aria-label="add" />
  </AppButton>
)

interface MenuProps {
  onAddMath: () => void
}

const Button = ({ ...props }) => <a {...props}>Add Document</a>

const AddDocumentButton = withModal(Button, AddDocument, 'Add a document')

const Menu = ({
  onAddMath,
  onClickClose,
}: MenuProps & { onClickClose: () => void }) => (
  <div className="menu box p-0">
    <ul className="menu-list">
      <li>
        <AddDocumentButton buttonProps={{ onClick: onClickClose }} />
      </li>
      <li>
        <a
          onClick={() => {
            onClickClose()
            onAddMath()
          }}
        >
          Add Math
        </a>
      </li>
    </ul>
  </div>
)

const AddButtonWithMenu = withMenu<Record<string, never>, MenuProps>(
  AddButton,
  Menu,
)

export default AddButtonWithMenu
