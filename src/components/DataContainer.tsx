import React, { createContext, useContext, useState, useEffect } from 'react'
import { SessionContext } from '../contexts/session'
import { /*BFSFriends,*/ findMathDocumentsOfPerson } from '../dataTest'
import { IriString } from '@inrupt/solid-client'

export const PeopleContext = createContext<string[]>([])

interface Props {
  children: React.ReactNode
}

type MathDocument = {
  uri: IriString
  owner: IriString
  access: string
}

export const DocumentsContext = createContext<MathDocument[]>([])

const DataContainer = ({ children }: Props) => {
  const [info] = useContext(SessionContext)
  const [people, setPeople] = useState<string[]>([])
  const [mathDocuments, setMathDocuments] = useState<MathDocument[]>([])

  useEffect(() => {
    // here we lookup people connected to us
    if (info?.isLoggedIn) {
      // BFSFriends(info.webId, setPeople)
      setPeople([info.webId])
    } else {
      setPeople([])
    }
  }, [info])

  // we lookup math documents of found people
  useEffect(() => {
    people.forEach(person =>
      findMathDocumentsOfPerson(person)
        .then(documents =>
          setMathDocuments(state => {
            const notAddedYet = documents.filter(
              doc => !state.find(stateDoc => doc === stateDoc.uri),
            )
            if (notAddedYet.length > 0) {
              return [
                ...state,
                ...notAddedYet.map(uri => ({ uri, owner: person, access: '' })),
              ]
            } else return state
          }),
        )
        .catch(e => {
          e
        }),
    )
  }, [people])

  useEffect(() => {
    console.log(
      'documents',
      mathDocuments.map(doc => doc.uri),
    )
  }, [mathDocuments])

  return (
    <DocumentsContext.Provider value={mathDocuments}>
      <PeopleContext.Provider value={people}>{children}</PeopleContext.Provider>
    </DocumentsContext.Provider>
  )
}

export default DataContainer
