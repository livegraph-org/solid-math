import React, { useState } from 'react'
import { GraphNode } from '../types'

interface EditProps {
  value: GraphNode['type']
  onChange: (type: GraphNode['type']) => void
}

export const NodeTypeEdit = ({ value, onChange }: EditProps) => {
  const [edit, setEdit] = useState(false)

  const availableTypes: GraphNode['type'][] = ['definition', 'statement']

  const handleSelectTag = (type: GraphNode['type']) => {
    setEdit(false)
    onChange(type)
  }

  return (
    <div className="tags">
      {edit ? (
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
          {value}
          <button
            className="delete is-small"
            onClick={() => setEdit(true)}
          ></button>
        </span>
      )}
    </div>
  )
}

export const NodeType = ({ value }: { value: GraphNode['type'] }) => (
  <span className="tag is-info">{value}</span>
)
