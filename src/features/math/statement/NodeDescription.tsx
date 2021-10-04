import React from 'react'
import Math from '../Math'
import { GraphNode } from '../types'

export const NodeDescription = ({ node }: { node: GraphNode }) => (
  <Math>{node.description.en}</Math>
)

export const NodeDescriptionEdit = ({
  value,
  onChange,
}: {
  value: string
  onChange: (value: string) => void
}) => {
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
        value={value}
        onChange={e => onChange(e.target.value)}
      />
      <Math>{value}</Math>
    </>
  )
}
