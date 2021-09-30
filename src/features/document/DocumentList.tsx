import React from 'react'
import { useAppSelector } from '../../app/hooks'
import { selectDocuments } from './documentSlice'

const DocumentList = () => {
  const documents = useAppSelector(selectDocuments)
  return (
    <ul>
      {documents.map(({ id: uri }) => (
        <li key={uri}>{uri}</li>
      ))}
    </ul>
  )
}

export default DocumentList
