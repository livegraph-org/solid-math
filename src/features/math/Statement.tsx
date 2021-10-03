import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import Math from './Math'
import { select, selectSelectedNode, updateNode } from './mathSlice'
import NodeList from './statement/NodeList'
import { GraphNode } from './types'

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
        <NodeDescription node={node} />
      </section>
      <NodeList
        title="dependencies"
        node={node}
        nodes={dependencies}
        editable
      />
      <NodeList title="dependents" node={node} nodes={dependents} />
    </div>
  )
}

export default Statement

const NodeDescription = ({ node }: { node: GraphNode }) => {
  const [edit, setEdit] = useState(false)
  return edit ? (
    <NodeDescriptionEdit node={node} onFinish={() => setEdit(false)} />
  ) : (
    <>
      <Math>{node.description.en}</Math>
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

const NodeDescriptionEdit = ({
  node,
  onFinish,
}: {
  node: GraphNode
  onFinish: () => void
}) => {
  const [description, setDescription] = useState(node.description.en)
  const dispatch = useAppDispatch()

  useEffect(() => {
    setDescription(node.description.en)
  }, [node])

  const handleCancel = () => {
    onFinish()
    setDescription(node.description.en)
  }

  const handleSave = () => {
    dispatch(
      updateNode({
        description: { en: description },
        id: node.uri,
        document: node.document.id,
      }),
    )
    handleCancel()
  }

  return (
    <>
      <span className="has-text-grey is-size-7">
        You can use{' '}
        <a href="https://www.markdownguide.org/basic-syntax/">Markdown</a> and{' '}
        <a href="http://asciimath.org/">AsciiMath</a> (use $inline math$ and
        $$multiline math$$).
      </span>
      <textarea
        className="textarea"
        placeholder="description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <Math>{description}</Math>
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
