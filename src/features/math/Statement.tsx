import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import Math from './Math'
import { highlight, select, selectSelectedNode, updateNode } from './mathSlice'
import { GraphNode } from './types'

interface NodeListProps {
  title: string
  nodes: GraphNode[]
}

const NodeList: React.FC<NodeListProps> = ({ title, nodes }: NodeListProps) => {
  const dispatch = useAppDispatch()
  return (
    <>
      <header className="card-header">
        <p className="card-header-title">
          {title}: {nodes.length}
        </p>
      </header>
      <section className="card-content">
        <ul className="buttons are-small">
          {nodes.map(node => (
            <li
              onClick={() => dispatch(select(node.uri))}
              onMouseEnter={() => dispatch(highlight(node.uri))}
              onMouseLeave={() => dispatch(highlight(''))}
              key={node.uri}
              className="button is-link is-inverted"
            >
              {node.label.en}
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

const NodeLabelEdit = ({
  node,
  onFinish,
}: {
  node: GraphNode
  onFinish: () => void
}) => {
  const [label, setLabel] = useState(node.label.en)
  const [type, setType] = useState(node.type)
  const [editType, setEditType] = useState(false)
  const dispatch = useAppDispatch()

  useEffect(() => {
    setLabel(node.label.en)
    setType(node.type)
  }, [node])

  const availableTypes: GraphNode['type'][] = ['definition', 'statement']

  const handleCancel = () => {
    onFinish()
    setEditType(false)
    setLabel(node.label.en)
    setType(node.type)
  }

  const handleSelectTag = (type: GraphNode['type']) => {
    setEditType(false)
    setType(type)
  }

  const handleSave = () => {
    dispatch(
      updateNode({
        type,
        label: { en: label },
        id: node.uri,
        document: node.document.id,
      }),
    )
    handleCancel()
  }

  return (
    <>
      <p className="card-header-title">
        <input
          className="input is-small"
          type="text"
          placeholder="label"
          value={label}
          onChange={e => setLabel(e.target.value)}
          size={10}
        />
        <div className="tags">
          {editType ? (
            availableTypes.map(type => (
              <span
                key={type}
                className="tag is-info is-light"
                onClick={() => handleSelectTag(type)}
              >
                {type}
              </span>
            ))
          ) : (
            <span className="tag is-info">
              {type}
              <button
                className="delete is-small"
                onClick={() => setEditType(true)}
              ></button>
            </span>
          )}
        </div>
      </p>
      <button
        className="card-header-icon"
        aria-label="cancel editing"
        title="cancel editing"
        onClick={handleCancel}
      >
        <i className="icon icon-cancel has-text-danger" aria-hidden="true"></i>
      </button>
      <button
        className="card-header-icon"
        aria-label="save changes"
        title="save changes"
        onClick={handleSave}
      >
        <i className="icon icon-ok has-text-success" aria-hidden="true"></i>
      </button>
    </>
  )
}

const NodeLabel = ({ node }: { node: GraphNode }) => {
  const [edit, setEdit] = useState(false)
  return edit ? (
    <NodeLabelEdit node={node} onFinish={() => setEdit(false)} />
  ) : (
    <>
      <p className="card-header-title">
        <a href={node.uri}>{node.label.en}</a>
        <span className="tag is-info">{node.type}</span>
      </p>
      {node.document.access.user.write && (
        <button
          className="card-header-icon"
          aria-label="edit label"
          onClick={() => setEdit(true)}
        >
          <i className="icon icon-edit" aria-hidden="true"></i>
        </button>
      )}
    </>
  )
}

const Statement = () => {
  const dispatch = useAppDispatch()
  const onSelectNode = (uri: string) => dispatch(select(uri))
  const node = useAppSelector(selectSelectedNode)

  const dependencies: GraphNode[] = Object.values(node.dependencies)
  const dependents: GraphNode[] = Object.values(node.dependents)

  return (
    <div className="card">
      <header className="card-header">
        <NodeLabel node={node} />
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
        <Math>{node.description.en}</Math>
      </section>
      <NodeList title="dependencies" nodes={dependencies} />
      <NodeList title="dependents" nodes={dependents} />
    </div>
  )
}

export default Statement
