import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { createMath, selectCreateMath, selectSelected } from '../mathSlice'
import StatementEdit from './StatementEdit'
import StatementView from './StatementView'

/** We show info of selected node, or edit the info */

const Statement = () => {
  const [edit, setEdit] = useState(false)
  const selectedNode = useAppSelector(selectSelected)
  const createNew = useAppSelector(selectCreateMath)
  const dispatch = useAppDispatch()

  // when we switch the node, we disable editing
  useEffect(() => {
    setEdit(false)
  }, [selectedNode])

  if (createNew)
    return <StatementEdit onFinish={() => dispatch(createMath(false))} />

  if (!selectedNode) return null

  if (edit) return <StatementEdit onFinish={() => setEdit(false)} />

  return <StatementView onEdit={() => setEdit(true)} />
}

export default Statement
