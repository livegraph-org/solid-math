import React from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { highlight, select } from '../math/mathSlice'
import { selectSearch, selectSearchResults, setSearch } from './searchSlice'

const Search: React.FC = ({ ...props }) => {
  const value = useAppSelector(selectSearch)
  const options = useAppSelector(selectSearchResults)
  const dispatch = useAppDispatch()

  return (
    <div {...props} className="box p-0">
      <input
        type="text"
        className="input"
        placeholder="Search"
        value={value}
        onChange={e => dispatch(setSearch(e.target.value))}
      />
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
                  dispatch(setSearch(''))
                }}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Search
