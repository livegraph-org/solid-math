import { useState, useEffect } from 'react'
import {
  getSolidDataset,
  UrlString,
  getThingAll,
  getTermAll,
  getTerm,
  asUrl,
} from '@inrupt/solid-client'
import { fetch } from '@inrupt/solid-client-authn-browser'
import { rdf, dct, rdfs } from 'rdf-namespaces'

export type GraphNode = {
  type: UrlString
  uri: UrlString
  description: string
  label: string
  dependencies: {
    [uri: string]: GraphNode
  }
  dependents: {
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
    dependencies: {},
    dependents: {},
    label: '',
  }
  return graph[uri]
}

const fetchGraph = async (uri: UrlString): Promise<Graph> => {
  const dataset = await getSolidDataset(uri, { fetch })
  const things = getThingAll(dataset)
  const graph: Graph = {}
  things.forEach(thing => {
    const uri = asUrl(thing)
    const type = getTerm(thing, rdf.type)?.value ?? ''
    const description = getTerm(thing, dct.description)?.value ?? ''
    const label = getTerm(thing, rdfs.label)?.value ?? ''
    const dependencies: GraphNode['dependencies'] = getTermAll(
      thing,
      'https://terms.math.livegraph.org#depends_on',
    ).reduce((dependencies, dependency) => {
      dependencies[dependency.value] = ensureNode(graph, dependency.value)
      return dependencies
    }, {} as GraphNode['dependencies'])
    Object.assign(ensureNode(graph, uri), {
      type,
      description,
      dependencies,
      label,
      uri,
    })

    Object.keys(dependencies).forEach(dependencyUri => {
      ensureNode(graph, dependencyUri)
      graph[dependencyUri].dependents[uri] = graph[uri]
    })
  })
  return graph
}

const useGraph = (uris: UrlString[]) => {
  const [graph, setGraph] = useState<Graph>({})

  useEffect(() => {
    uris.forEach(async uri => {
      const data = await fetchGraph(uri)
      setGraph(graph => ({
        ...graph,
        ...data,
      }))
    })
  }, [uris])
  return graph
}

export default useGraph

/*
const fetcher = async (
  uris: UrlString[],
): Promise<(SolidDataset & WithResourceInfo)[]> => {
  return await Promise.all(uris.map(url => getSolidDataset(url, { fetch })))
}

export default function useGraph(uris: UrlString[]): [Graph, () => void] {
  // download graph
  const { data, revalidate } = useSwr(() => uris, fetcher)

  const [response, setResponse] = useState<Graph>({})

  // whenever data change, we process them into an object of type Graph
  useEffect(() => {
    const graph: Graph = {}

    if (data) {
      for (const datum of data) {
        const things = getThingAll(datum)
        things.forEach(thing => {
          const uri = asUrl(thing)
          const type = getTerm(thing, rdf.type)?.value ?? ''
          const description = getTerm(thing, dct.description)?.value ?? ''
          const label = getTerm(thing, rdfs.label)?.value ?? ''
          const dependencies = getTermAll(
            thing,
            'https://terms.math.livegraph.org#depends_on',
          )
          const dependencies: GraphNode['dependencies'] = dependencies.reduce(
            (dependencies, dependency) => {
              dependencies[dependency.value] = ensureNode(graph, dependency.value)
              return dependencies
            },
            {} as GraphNode['dependencies'],
          )
          Object.assign(ensureNode(graph, uri), {
            type,
            description,
            dependencies,
            label,
            uri,
          })
        })
      }
    }

    setResponse(graph)
  }, [data])

  return [response, revalidate]
}
*/
