import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectNaiveStorage } from '../login/loginSlice'
import { createDocument } from './documentSlice'

const AddDocument = ({
  onFinish = () => undefined,
}: {
  onFinish?: () => void
}) => {
  const storage = useAppSelector(selectNaiveStorage)
  const dispatch = useAppDispatch()
  const [isPublic, setIsPublic] = useState(true)
  const [filename, setFilename] = useState('')
  return (
    <section>
      <form
        onSubmit={e => {
          e.preventDefault()
          dispatch(
            createDocument({
              uri: `${storage}${
                isPublic ? 'public' : 'private'
              }/math/${filename}.ttl`,
              isPublic,
            }),
          )
          onFinish()
        }}
      >
        <div className="field buttons are-small has-addons">
          <input
            className={`button${isPublic ? ' is-success' : ''}`}
            type="button"
            value="Public"
            onClick={() => setIsPublic(true)}
          />
          <input
            className={`button${isPublic ? '' : ' is-warning'}`}
            type="button"
            value="Private"
            onClick={() => setIsPublic(false)}
          />
        </div>
        <div className="field">
          {storage}
          {isPublic ? 'public' : 'private'}/math/
          <input
            type="text"
            value={filename}
            placeholder="set-theory"
            onChange={e => setFilename(e.target.value)}
          />
          .ttl
        </div>
        <div className="field buttons">
          <input className="button is-success" type="submit" value="Create" />
          <input
            className="button is-danger"
            type="reset"
            value="Cancel"
            onClick={onFinish}
          />
        </div>
      </form>
    </section>
  )
}

export default AddDocument
