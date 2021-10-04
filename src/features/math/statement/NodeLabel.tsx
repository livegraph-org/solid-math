import React from 'react'

interface EditProps {
  value: string
  onChange: (label: string) => void
}

export const NodeLabelEdit = ({ value, onChange }: EditProps) => {
  return (
    <input
      className="input is-small"
      type="text"
      placeholder="label"
      value={value}
      onChange={e => onChange(e.target.value)}
      size={10}
    />
  )
}

export const NodeLabel = ({ uri, label }: { uri: string; label: string }) => (
  <a href={uri}>{label}</a>
)
