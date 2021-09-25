import { fetch } from '@inrupt/solid-client-authn-browser'
import {
  getSolidDataset,
  getTerm,
  getThing,
  getThingAll,
  getTermAll,
  IriString,
} from '@inrupt/solid-client'
import { solid, foaf } from 'rdf-namespaces'
import { Dictionary } from './types'

// following https://github.com/solid/solid/blob/main/proposals/data-discovery.md to discover math documents of a user
export const findMathDocumentsOfPerson = async (
  webId: IriString,
): Promise<IriString[]> => {
  if (webId) {
    const dataset = await getSolidDataset(webId, { fetch })
    const me = getThing(dataset, webId)
    if (me) {
      const publicTypeIndex = getTerm(me, solid.publicTypeIndex)?.value
      if (publicTypeIndex) {
        const index = await getSolidDataset(publicTypeIndex, { fetch })
        const things = getThingAll(index)
        const mathDocuments = things
          .filter(thing =>
            getTermAll(thing, solid.forClass)
              .map(a => a.value)
              .includes('https://terms.math.livegraph.org#concept'),
          )
          .map(thing => getTermAll(thing, solid.instance))
          .flat()
          .map(a => a.value)
        return mathDocuments
      }
    }
  }
  return ['https://mrkvon.solidcommunity.net/public/math/index.ttl']
}

export const findFriends = async (webId: IriString): Promise<IriString[]> => {
  if (webId) {
    const dataset = await getSolidDataset(getResourceUrl(webId), { fetch })
    const person = getThing(dataset, webId)
    if (person) {
      const friends = getTermAll(person, foaf.knows).map(a => a.value)
      return friends
    }
  }

  return []
}

type BFSPerson = {
  uri: IriString
  visited: boolean
}

// We'll need to figure out how to stop this
export const BFSFriends = async (
  webId: IriString,
  onChange: (people: IriString[]) => void,
): Promise<void> => {
  webId = fixUri(webId)
  const timbl = 'https://timbl.solidcommunity.net/profile/card#me'
  const people: Dictionary<BFSPerson> = {
    [webId]: { uri: webId, visited: false },
    [timbl]: { uri: timbl, visited: false },
  }

  let length = Object.keys(people).length
  onChange(Object.keys(people))

  while (
    Object.values(people)
      .map(person => person.visited)
      .includes(false)
  ) {
    // take a first unvisited person
    const unvisitedPerson = Object.values(people).find(
      person => !person.visited,
    )
    if (unvisitedPerson) {
      // set them visited
      unvisitedPerson.visited = true
      // fetch their friends
      try {
        const friends = await findFriends(unvisitedPerson.uri)
        // add their friends
        friends.forEach(uri => {
          uri = fixUri(uri)
          people[uri] = people?.[uri] ?? { uri, visited: false }
        })
      } catch (e) {
        e
      } finally {
        if (length !== Object.keys(people).length) {
          onChange(Object.keys(people))
          length = Object.keys(people).length
        }
      }
    } else break
  }
}

const getResourceUrl = (url: string): string => {
  const resourceUrl = new URL(url)
  resourceUrl.hash = ''
  return resourceUrl.href
}

const fixUri = (uri: IriString) => {
  const regex = /^(.+)\.solid.community(.*)$/
  const match = uri.match(regex)
  if (match) {
    const [, begin, end] = match
    uri = `${begin}.solidcommunity.net${end}`
  }

  return uri
}
