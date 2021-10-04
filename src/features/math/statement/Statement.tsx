import React, { useState } from 'react'
import { useEffect } from 'react'
import { useAppSelector } from '../../../app/hooks'
import { selectSelected } from '../mathSlice'
import StatementEdit from './StatementEdit'
import StatementView from './StatementView'

/** We show info of selected node, or edit the info */

const Statement = () => {
  const [edit, setEdit] = useState(false)
  const selectedNode = useAppSelector(selectSelected)

  // when we switch the node, we disable editing
  useEffect(() => {
    setEdit(false)
  }, [selectedNode])

  if (!selectedNode) return null

  if (edit) return <StatementEdit onFinish={() => setEdit(false)} />

  return <StatementView onEdit={() => setEdit(true)} />
}

export default Statement
