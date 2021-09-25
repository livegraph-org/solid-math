import React, { HTMLAttributes, useState } from 'react'
import { useCallback } from 'react'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import AppButton from '../../components/AppButton'
import { highlight, select } from '../math/mathSlice'
import { selectSearch, selectSearchResults, setSearch } from './searchSlice'

const Search: React.FC<HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
  const value = useAppSelector(selectSearch)
  const options = useAppSelector(selectSearchResults)
  const dispatch = useAppDispatch()
  const [open, setOpen] = useState(false)

  const clear = useCallback(() => {
    setOpen(false)
    dispatch(setSearch(''))
  }, [dispatch])

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        clear()
      }
    }
    document.addEventListener('keydown', handleEsc, false)
    return () => document.removeEventListener('keydown', handleEsc, false)
  }, [clear])

  return open ? (
    <div {...props} className="box p-0">
      <p className="control has-icons-right">
        <input
          autoFocus
          type="text"
          className="input"
          placeholder="Search"
          value={value}
          onChange={e => dispatch(setSearch(e.target.value))}
        />
        <span className="icon is-right">
          <i className="icon icon-search" />
        </span>
      </p>
      <div className="menu">
        <ul className="menu-list">
          {options.map(({ value, label }) => (
            <li
              key={value}
              title={value}
              onMouseEnter={() => dispatch(highlight(value))}
              onMouseLeave={() => dispatch(highlight(''))}
            >
              <a
                onClick={() => {
                  dispatch(select(value))
                  clear()
                }}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  ) : (
    <AppButton onClick={() => setOpen(true)}>
      <i className="icon icon-search" />
    </AppButton>
  )
}

export default Search
