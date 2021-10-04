import React from 'react'
import ReactTags, { TagComponentProps } from 'react-tag-autocomplete'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import {
  selectAutocompleteResults,
  setAutocomplete,
} from '../../search/searchSlice'
import { highlight, select } from '../mathSlice'
import { GraphNode } from '../types'
import './react-tag-autocomplete.css'

interface NodeListProps {
  title: string
  nodes: GraphNode[]
}

export const NodeList: React.FC<NodeListProps> = ({
  title,
  nodes,
}: NodeListProps) => {
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

export const NodeListEdit = ({
  title,
  nodes,
  onAddNode,
  onRemoveNode,
}: {
  title: string
  nodes: GraphNode[]
  onAddNode: (node: GraphNode) => void
  onRemoveNode: (node: GraphNode) => void
}) => {
  const dispatch = useAppDispatch()

  const handleAdd = (tag: { id: string | number; name: string }) => {
    const fullTag = suggestionsRaw.find(s => s.uri === tag.id)
    if (fullTag) {
      onAddNode(fullTag)
    }
  }

  const handleRemove = (a: number) => {
    onRemoveNode(nodes[a])
  }

  const tags = Object.values(nodes).map(({ uri, label }) => ({
    id: uri,
    name: label.en,
  }))

  const suggestionsRaw = useAppSelector(selectAutocompleteResults)

  const suggestions = suggestionsRaw.map(({ label, uri }) => ({
    id: uri,
    name: label.en,
  }))

  return (
    <>
      <header className="card-header">
        <p className="card-header-title">
          {title}: {nodes.length}
        </p>
      </header>
      <section className="card-content">
        <ReactTags
          suggestions={suggestions}
          tags={tags}
          onInput={value => dispatch(setAutocomplete(value))}
          onAddition={handleAdd}
          onDelete={handleRemove}
          placeholderText="Add a dependency"
          removeButtonText="Remove the dependency"
          classNames={{
            root: 'react-tags',
            rootFocused: 'is-focused',
            selected: 'react-tags__selected tags',
            selectedTag: 'react-tags__selected-tag',
            selectedTagName: 'react-tags__selected-tag-name',
            search: 'react-tags__search',
            searchInput: 'react-tags__search-input',
            suggestions: 'react-tags__suggestions',
            suggestionActive: 'is-active',
            suggestionDisabled: 'is-disabled',
          }}
          allowBackspace={false}
          tagComponent={TagComponent}
        />
      </section>
    </>
  )
}

const TagComponent = ({
  tag,
  removeButtonText,
  onDelete,
}: TagComponentProps) => {
  return (
    <span className="tag is-info">
      {tag.name}
      <button
        title={removeButtonText}
        onClick={onDelete}
        className="delete is-small"
      ></button>
    </span>
  )
}
