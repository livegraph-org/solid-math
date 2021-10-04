import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { select, selectSelectedNode } from '../mathSlice'
import { GraphNode } from '../types'
import { NodeDescription } from './NodeDescription'
import { NodeLabel } from './NodeLabel'
import { NodeList } from './NodeList'
import { NodeType } from './NodeType'

const StatementView = ({ onEdit }: { onEdit: () => void }) => {
  const dispatch = useAppDispatch()
  const onSelectNode = (uri: string) => dispatch(select(uri))
  const node = useAppSelector(selectSelectedNode)

  const dependencies: GraphNode[] = Object.values(node.dependencies)
  const dependents: GraphNode[] = Object.values(node.dependents)

  return (
    <div className="card">
      <header className="card-header">
        <p className="card-header-title">
          <div>
            <div>
              <NodeLabel uri={node.uri} label={node.label.en} />
            </div>
            <div>
              <NodeType value={node.type} />
            </div>
          </div>
        </p>
        {node.document.access.user.write && (
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
    </div>
  )
}

export default StatementView
