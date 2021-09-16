import React from 'react'
import { GraphNode } from '../hooks/graph'
import Math from './Math'

interface Props {
  node: GraphNode
  onSelectNode: (uri: string) => void
}

const Statement = ({ node, onSelectNode }: Props) => {
  const dependencies: GraphNode[] = Object.values(node.dependencies)
  const dependents: GraphNode[] = Object.values(node.dependents)
  return (
    <div className="card">
      <header className="card-header">
        <p className="card-header-title">
          <a href={node.uri}>{node.label}</a>
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
        <Math>{node.description}</Math>
      </section>
      <header className="card-header">
        <p className="card-header-title">dependencies: {dependencies.length}</p>
      </header>
      <section className="card-content">
        <ul className="buttons are-small">
          {dependencies.map(dependency => (
            <li
              onClick={() => onSelectNode(dependency.uri)}
              key={dependency.uri}
              className="button is-link is-inverted"
            >
              {dependency.label}
            </li>
          ))}
        </ul>
      </section>
      <header className="card-header">
        <p className="card-header-title">dependents: {dependents.length}</p>
      </header>
      <section className="card-content">
        <ul className="buttons are-small">
          {dependents.map(dependent => (
            <li
              onClick={() => onSelectNode(dependent.uri)}
              key={dependent.uri}
              className="button is-link is-inverted"
            >
              {dependent.label}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default Statement
