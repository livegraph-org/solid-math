import { useState, useEffect } from 'react'
import {
  getSolidDataset,
  SolidDataset,
  WithResourceInfo,
  UrlString,
  getThingAll,
  getTermAll,
  getTerm,
  asUrl,
} from '@inrupt/solid-client'
import { fetch } from '@inrupt/solid-client-authn-browser'
import useSwr from 'swr'
import { rdf, dct, rdfs } from 'rdf-namespaces'

export type GraphNode = {
  type: UrlString
  uri: UrlString
  description: string
  label: string
  dependsOn: {
    [uri: string]: GraphNode
  }
}

export type Graph = {
  [uri: string]: GraphNode
}

// function: Make sure the given Graph has a node with given uri
// it checks whether the node exists and creates a node if it doesn't exist
const ensureNode = (graph: Graph, uri: UrlString): GraphNode => {
  graph[uri] = graph[uri] ?? {
    type: '',
    description: '',
    dependsOn: {},
    label: '',
  }
  return graph[uri]
}

const fetcher = async (
  url: UrlString,
): Promise<SolidDataset & WithResourceInfo> => {
  return await getSolidDataset(url, { fetch })
}

export default function useGraph(): [Graph, () => void] {
  // download graph
  const { data, revalidate } = useSwr(
    'https://mrkvon.solidcommunity.net/public/math/index.ttl',
    fetcher,
  )

  const [response, setResponse] = useState<Graph>({})

  // whenever data change, we process them into an object of type Graph
  useEffect(() => {
    const graph: Graph = {}

    if (data) {
      const things = getThingAll(data)
      things.forEach(thing => {
        const uri = asUrl(thing)
        const type = getTerm(thing, rdf.type)?.value ?? ''
        const description = getTerm(thing, dct.description)?.value ?? ''
        const label = getTerm(thing, rdfs.label)?.value ?? ''
        const dependencies = getTermAll(
          thing,
          'https://terms.math.livegraph.org#depends_on',
        )
        const dependsOn: GraphNode['dependsOn'] = dependencies.reduce(
          (dependsOn, dependency) => {
            dependsOn[dependency.value] = ensureNode(graph, dependency.value)
            return dependsOn
          },
          {} as GraphNode['dependsOn'],
        )
        Object.assign(ensureNode(graph, uri), {
          type,
          description,
          dependsOn,
          label,
          uri,
        })
      })
    }

    setResponse(graph)
  }, [data])

  return [response, revalidate]
}
