import { EffectiveAccess } from '@inrupt/solid-client/dist/interfaces'
import classNames from 'classnames'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  selectDocument,
  selectDocuments,
  selectSelectedDocument,
} from './documentSlice'

const DocumentList = () => {
  const documents = useAppSelector(selectDocuments)
  const selectedDocument = useAppSelector(selectSelectedDocument)
  const dispatch = useAppDispatch()
  return (
    <ul>
      {documents.map(({ uri, access }) => (
        <li key={uri}>
          <button
            className={classNames(
              'button is-small',
              uri === selectedDocument && 'is-success',
            )}
            disabled={!(access.user.write || access.user.append)}
            onClick={() => dispatch(selectDocument(uri))}
          >
            {uri} {getAccessString(access)}
          </button>
        </li>
      ))}
    </ul>
  )
}

/* little utility functions to say what access there is */
const getSingleAccessString = (access: {
  read: boolean
  write: boolean
  append: boolean
}) => {
  let response = ''
  if (access.read) response += 'R'
  if (access.write) response += 'W'
  if (access.append) response += 'A'
  return response
}

const getAccessString = (access: EffectiveAccess): string => {
  let response = getSingleAccessString(access.user)

  if (access.public) {
    response += ' '
    response += getSingleAccessString(access.public)
  }

  return response || 'none'
}

export default DocumentList
