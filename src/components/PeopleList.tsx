import React, { useContext } from 'react'
import { PeopleContext } from './DataContainer'

interface Props {
  people: string[]
}

export const PeopleList = ({ people, ...props }: Props) => (
  <div {...props}>
    <div>{people.length}</div>
    {/*
    <ul>
      {people.map(person => (
        <li key={person}>{person}</li>
      ))}
    </ul>*/}
  </div>
)

type ULProps = Partial<React.HTMLAttributes<HTMLUListElement>>

export const PeopleListContainer = (props: ULProps) => {
  const people = useContext(PeopleContext)
  return <PeopleList people={people} {...props} />
}
