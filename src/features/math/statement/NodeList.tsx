import React, { useEffect, useState } from 'react'
import ReactTags, { TagComponentProps } from 'react-tag-autocomplete'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import {
  selectAutocompleteResults,
  setAutocomplete,
} from '../../search/searchSlice'
import { highlight, select, updateNode } from '../mathSlice'
import { GraphNode } from '../types'
import './react-tag-autocomplete.css'

interface NodeListProps {
  title: string
  node: GraphNode
  nodes: GraphNode[]
  editable?: boolean
}

const NodeList: React.FC<NodeListProps> = ({
  title,
  node,
  nodes,
  editable = false,
}: NodeListProps) => {
  const [edit, setEdit] = useState(false)
  const dispatch = useAppDispatch()
  return edit ? (
    <NodeListEdit
      title={title}
      node={node}
      nodes={nodes}
      onFinish={() => setEdit(false)}
    />
  ) : (
    <>
      <header className="card-header">
        <p className="card-header-title">
          {title}: {nodes.length}
        </p>
        {node.document.access.user.write && editable && (
          <button
            className="card-header-icon"
            aria-label="edit label"
            onClick={() => setEdit(true)}
          >
            <i className="icon icon-edit" aria-hidden="true"></i>
          </button>
        )}
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

const NodeListEdit = ({
  title,
  node,
  nodes,
  onFinish,
}: {
  title: string
  node: GraphNode
  nodes: GraphNode[]
  onFinish: () => void
}) => {
  const [dependencies, setDependencies] = useState(
    Object.values(node.dependencies),
  )
  const dispatch = useAppDispatch()

  useEffect(() => {
    setDependencies(Object.values(node.dependencies))
  }, [node])

  const handleCancel = () => {
    onFinish()
    setDependencies(Object.values(node.dependencies))
  }

  const handleSave = () => {
    dispatch(
      updateNode({
        dependencies: dependencies.map(({ uri }) => uri),
        id: node.uri,
        document: node.document.id,
      }),
    )
    handleCancel()
  }

  const handleAdd = (tag: { id: string | number; name: string }) => {
    const fullTag = suggestionsRaw.find(s => s.uri === tag.id)
    if (fullTag) {
      setDependencies(deps => [...deps, fullTag])
    }
  }

  const handleRemove = (a: number) => {
    setDependencies(deps => deps.filter((_, i) => i !== a))
  }

  const tags = Object.values(dependencies).map(({ uri, label }) => ({
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
        <ReactTags
          suggestions={suggestions}
          tags={tags}
          onInput={value => dispatch(setAutocomplete(value))}
          onAddition={handleAdd}
          onDelete={handleRemove}
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

export default NodeList
