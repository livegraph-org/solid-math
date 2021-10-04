import React, { useCallback, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { selectSelectedNode, updateNode } from '../mathSlice'
import { GraphNode } from '../types'
import { NodeDescriptionEdit } from './NodeDescription'
import { NodeLabelEdit } from './NodeLabel'
import { NodeTypeEdit } from './NodeType'
import { NodeListEdit } from './NodeList'

const StatementEdit = ({ onFinish }: { onFinish: () => void }) => {
  const dispatch = useAppDispatch()
  const node = useAppSelector(selectSelectedNode)

  const [type, setType] = useState(node.type)
  const [label, setLabel] = useState(node.label.en)
  const [description, setDescription] = useState(node.description.en)
  const [dependencies, setDependencies] = useState(
    Object.values(node.dependencies),
  )

  const setInitial = useCallback(() => {
    setType(node.type)
    setLabel(node.label.en)
    setDescription(node.description.en)
    setDependencies(Object.values(node.dependencies))
  }, [node])

  const handleAddNode = (node: GraphNode) => {
    setDependencies(deps => [...deps, node])
  }

  const handleRemoveNode = (node: GraphNode) => {
    setDependencies(deps => deps.filter(n => n.uri !== node.uri))
  }

  const handleSave = () => {
    dispatch(
      updateNode({
        type,
        label: { en: label },
        description: { en: description },
        dependencies: dependencies.map(({ uri }) => uri),
        id: node.uri,
        document: node.document.id,
      }),
    )
    handleCancel()
  }

  useEffect(() => {
    setInitial()
  }, [node, setInitial])

  const handleCancel = () => {
    setInitial()
    onFinish()
  }

  return (
    <div className="card">
      <header className="card-header">
        <p className="card-header-title">
          <div>
            <div>
              <NodeLabelEdit value={label} onChange={setLabel} />
            </div>
            <div>
              <NodeTypeEdit value={type} onChange={setType} />
            </div>
          </div>
        </p>
        <button
          className="card-header-icon"
          aria-label="cancel editing"
          title="cancel editing"
          onClick={handleCancel}
        >
          <i
            className="icon icon-cancel has-text-danger"
            aria-hidden="true"
          ></i>
        </button>
        <button
          className="card-header-icon"
          aria-label="save changes"
          title="save changes"
          onClick={handleSave}
        >
          <i className="icon icon-ok has-text-success" aria-hidden="true"></i>
        </button>
      </header>
      <section className="card-content">
        <NodeDescriptionEdit value={description} onChange={setDescription} />
      </section>
      <NodeListEdit
        title="dependencies"
        nodes={dependencies}
        onAddNode={handleAddNode}
        onRemoveNode={handleRemoveNode}
      />
      <footer className="card-footer">
        <button
          className="card-header-icon card-footer-item"
          aria-label="cancel editing"
          title="cancel editing"
          onClick={handleCancel}
        >
          <i
            className="icon icon-cancel has-text-danger"
            aria-hidden="true"
          ></i>{' '}
          Cancel
        </button>
        <button
          className="card-header-icon card-footer-item"
          aria-label="save changes"
          title="save changes"
          onClick={handleSave}
        >
          <i className="icon icon-ok has-text-success" aria-hidden="true"></i>{' '}
          Save
        </button>
      </footer>
    </div>
  )
}

export default StatementEdit
