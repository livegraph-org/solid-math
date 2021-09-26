import React from 'react'
import withMenu from '../../components/withMenu'
import AppButton from '../../components/AppButton'
import withModal from '../../components/withModal'

const AddButton = ({ ...props }) => (
  <AppButton {...props}>
    <i className="icon icon-plus" aria-label="add" />
  </AppButton>
)

interface MenuProps {
  onAddMath: () => void
}

const Button = ({ ...props }) => <a {...props}>Add Document</a>
const ModalContent = () => <div>Modal Content</div>

const AddDocument = withModal(Button, ModalContent, 'Add a document')

const Menu = ({
  onAddMath,
  onClickClose,
}: MenuProps & { onClickClose: () => void }) => (
  <div className="menu box p-0">
    <ul className="menu-list">
      <li>
        <AddDocument buttonProps={{ onClick: onClickClose }} />
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
