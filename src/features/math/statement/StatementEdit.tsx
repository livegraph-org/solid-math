import React, { useCallback, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import {
  selectDocument,
  selectSelectedDocument,
  selectWriteAppendDocuments,
} from '../../document/documentSlice'
import { selectWebId } from '../../login/loginSlice'
import {
  createNode,
  selectCreateMath,
  selectSelectedNode,
  updateNode,
} from '../mathSlice'
import { GraphNode } from '../types'
import { NodeDescriptionEdit } from './NodeDescription'
import { NodeLabelEdit } from './NodeLabel'
import { NodeListEdit } from './NodeList'
import { NodeTypeEdit } from './NodeType'

const StatementEdit = ({ onFinish }: { onFinish: () => void }) => {
  const dispatch = useAppDispatch()
  const isNew = useAppSelector(selectCreateMath)
  const node = useAppSelector(selectSelectedNode)
  const availableDocuments = useAppSelector(selectWriteAppendDocuments)
  const selectedDocument = useAppSelector(selectSelectedDocument)
  const webId = useAppSelector(selectWebId)

  const [type, setType] = useState<GraphNode['type'] | ''>(
    isNew ? '' : node.type,
  )
  const [label, setLabel] = useState(isNew ? '' : node.label.en)
  const [description, setDescription] = useState(
    isNew ? '' : node.description.en,
  )
  const [dependencies, setDependencies] = useState(
    isNew ? [] : Object.values(node.dependencies),
  )

  // @TODO validation should be better than this
  const isValid =
    type && label && description && (selectedDocument || node.document)

  const setInitial = useCallback(() => {
    setType(isNew ? '' : node.type)
    setLabel(isNew ? '' : node.label.en)
    setDescription(isNew ? '' : node.description.en)
    setDependencies(isNew ? [] : Object.values(node.dependencies))
  }, [node, isNew])

  const handleAddNode = (node: GraphNode) => {
    setDependencies(deps => [...deps, node])
  }

  const handleRemoveNode = (node: GraphNode) => {
    setDependencies(deps => deps.filter(n => n.uri !== node.uri))
  }

  const handleSave = () => {
    if (!type) throw new Error('please select a type')
    if (!label) throw new Error('please specify a label')
    if (!description) throw new Error('please write a description')
    if (!selectedDocument) throw new Error('please select a document')
    isNew
      ? dispatch(
          createNode({
            type,
            label: { en: label },
            description: { en: description },
            dependencies: dependencies.map(({ uri }) => uri),
            document: selectedDocument,
          }),
        )
      : dispatch(
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
          <div className="block">
            <div className="title is-6">
              {isNew ? (
                'Create a new Math'
              ) : (
                <>
                  Edit a {node.type} <i>{node.label.en}</i>
                </>
              )}
            </div>
            <div className="field">
              <NodeLabelEdit value={label} onChange={setLabel} />
            </div>
            <div className="field">
              <NodeTypeEdit value={type} onChange={setType} />
            </div>
            {isNew && (
              <div className="field select">
                <select
                  value={selectedDocument}
                  onChange={e => dispatch(selectDocument(e.target.value))}
                >
                  <option hidden disabled selected value="">
                    {' -- select a document to save to -- '}
                  </option>
                  {availableDocuments.map(doc => (
                    <option key={doc.uri} value={doc.uri}>
                      {removeCommonPart(doc.uri, webId)}
                    </option>
                  ))}
                </select>
              </div>
            )}
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
          className={`card-header-icon has-text-${
            isValid ? 'success' : 'grey-light'
          }`}
          aria-label="save changes"
          title="save changes"
          onClick={handleSave}
          disabled={!isValid}
        >
          <i className="icon icon-ok" aria-hidden="true"></i>
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
          className={`card-header-icon card-footer-item has-text-${
            isValid ? 'success' : 'grey-light'
          }`}
          aria-label="save changes"
          title="save changes"
          onClick={handleSave}
          disabled={!isValid}
        >
          <i className="icon icon-ok" aria-hidden="true"></i> Save
        </button>
      </footer>
    </div>
  )
}

const removeCommonPart = (input: string, base: string): string => {
  const ba = base.split('/')
  const ia = input.split('/')
  const i = ia.findIndex((a, i) => a !== ba[i])

  if (i < 3) return input
  else return ia.slice(i).join('/')
}

export default StatementEdit
