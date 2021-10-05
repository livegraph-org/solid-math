import React from 'react'
import { GraphNode } from '../types'

interface EditProps {
  value: GraphNode['type'] | ''
  onChange: (type: GraphNode['type'] | '') => void
}

export const NodeTypeEdit = ({ value, onChange }: EditProps) => {
  const availableTypes: GraphNode['type'][] = ['definition', 'statement']

  return (
    <div className="tags">
      {!value ? (
        availableTypes.map(type => (
          <span
            key={type}
            className="tag is-info is-light"
            onClick={() => onChange(type)}
          >
            {type}
          </span>
        ))
      ) : (
        <span className="tag is-info">
          {value}
          <button
            className="delete is-small"
            onClick={() => onChange('')}
          ></button>
        </span>
      )}
    </div>
  )
}

export const NodeType = ({ value }: { value: GraphNode['type'] }) => (
  <span className="tag is-info">{value}</span>
)
