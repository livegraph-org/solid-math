import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import withModal from '../../../components/withModal'
import { deleteNode, select, selectSelectedNode } from '../mathSlice'
import { GraphNode } from '../types'
import { NodeDescription } from './NodeDescription'
import { NodeLabel } from './NodeLabel'
import { NodeList } from './NodeList'
import { NodeType } from './NodeType'

const DeleteButton = ({ ...props }) => (
  <button {...props} className="button is-danger is-inverted">
    Delete Node
  </button>
)

const DeleteModal = ({
  uri,
  onFinish = () => null,
  onDelete,
  ...props
}: {
  uri: string
  onFinish?: () => void
  onDelete: () => void
}) => {
  const code = new URL(uri).hash || String(Date.now())
  const [value, setValue] = useState('')

  const isDisabled = code !== value

  const handleDelete = () => {
    onFinish()
    onDelete()
  }

  return (
    <div {...props}>
      If yes, please retype the text <code>{code}</code> below.
      <div className="field">
        <input
          maxLength={code.length}
          className="input"
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
      </div>
      <div className="buttons">
        <button
          className="button is-danger"
          disabled={isDisabled}
          onClick={handleDelete}
        >
          Delete
        </button>
        <button className="button is-info is-inverted" onClick={onFinish}>
          Cancel
        </button>
      </div>
    </div>
  )
}

const DeleteButtonWithModal = withModal(DeleteButton, DeleteModal)

const StatementView = ({ onEdit }: { onEdit: () => void }) => {
  const dispatch = useAppDispatch()
  const onSelectNode = (uri: string) => dispatch(select(uri))
  const node = useAppSelector(selectSelectedNode)

  if (node.label.en === 'aa') console.log(node)

  const dependencies: GraphNode[] = Object.values(node.dependencies)
  const dependents: GraphNode[] = Object.values(node.dependents)

  const isEditable = node.document.access.user.write

  return (
    <div className="card">
      <header className="card-header">
        <div className="card-header-title">
          <div>
            <div>
              <NodeLabel uri={node.uri} label={node.label.en} />
            </div>
            <div>
              <NodeType value={node.type} />
            </div>
          </div>
        </div>
        {isEditable && (
          <button
            className="card-header-icon"
            aria-label="edit label"
            onClick={onEdit}
          >
            <i className="icon icon-edit" aria-hidden="true"></i>
          </button>
        )}
        <span className="card-header-icon">
          <button
            className="delete"
            aria-label="close"
            onClick={() => onSelectNode('')}
          >
            close
          </button>
        </span>
      </header>
      <section className="card-content">
        <NodeDescription node={node} />
      </section>
      <NodeList title="dependencies" nodes={dependencies} />
      <NodeList title="dependents" nodes={dependents} />
      {isEditable && (
        <>
          <header className="card-header">
            <p className="card-header-title has-text-danger">Danger Zone</p>
          </header>
          <section className="card-content has-background-danger">
            <DeleteButtonWithModal
              title={`Do you really want to delete ${node.type} ${node.label.en}?`}
              contentProps={{
                uri: node.uri,
                onDelete: () => dispatch(deleteNode(node)),
              }}
            />
          </section>
        </>
      )}
    </div>
  )
}

export default StatementView
