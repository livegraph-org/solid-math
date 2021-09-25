import React from 'react'
import { highlight, select, selectSelectedNode } from './mathSlice'
import Math from './Math'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
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

const Statement = () => {
  const dispatch = useAppDispatch()
  const onSelectNode = (uri: string) => dispatch(select(uri))
  const node = useAppSelector(selectSelectedNode)

  const dependencies: GraphNode[] = Object.values(node.dependencies)
  const dependents: GraphNode[] = Object.values(node.dependents)

  return (
    <div className="card">
      <header className="card-header">
        <p className="card-header-title">
          <a href={node.uri}>{node.label.en}</a>
        </p>
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
