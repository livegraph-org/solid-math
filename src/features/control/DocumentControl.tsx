import React from 'react'
import AppButton from '../../components/AppButton'
import withModal from '../../components/withModal'
import DocumentList from '../document/DocumentList'

const Button = ({ ...props }) => (
  <AppButton {...props}>
    <i className="icon icon-document" aria-label="Math Documents" />
  </AppButton>
)

const DocumentControl = withModal(Button, DocumentList, 'Math Documents')

export default DocumentControl
