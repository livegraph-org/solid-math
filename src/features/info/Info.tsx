import classNames from 'classnames'
import React, { HTMLAttributes } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { clearInfo, InfoState, selectInfo } from './infoSlice'

interface InfoProps extends HTMLAttributes<HTMLDivElement> {
  info: InfoState
  onClose: () => void
}

const Info = ({ info, onClose, ...props }: InfoProps) => {
  if (!info.message) return null
  const notiStyle =
    info.type === 'success'
      ? 'success'
      : info.type === 'error'
      ? 'danger'
      : 'info'
  return (
    <div {...props}>
      <div className={classNames('notification', `is-${notiStyle}`)}>
        <button className="delete" onClick={onClose}></button>
        {info.message}
      </div>
    </div>
  )
}

const InfoContainer = ({ ...props }) => {
  const info = useAppSelector(selectInfo)
  const dispatch = useAppDispatch()

  return <Info info={info} onClose={() => dispatch(clearInfo())} {...props} />
}

export default InfoContainer
