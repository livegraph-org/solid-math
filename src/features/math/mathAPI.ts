import {
  getSolidDataset,
  UrlString,
  getThingAll,
  getTermAll,
  getTerm,
  getThing,
  asUrl,
} from '@inrupt/solid-client'
import { fetch } from '@inrupt/solid-client-authn-browser'
import { rdf, rdfs, solid } from 'rdf-namespaces'
import { Definition, Statement } from './mathSlice'

interface Graph {
  nodes: (Definition | Statement)[]
  links: [string, string][]
}

export const fetchGraph = async (uri: UrlString): Promise<Graph> => {
  const dataset = await getSolidDataset(uri, { fetch })
  const things = getThingAll(dataset)
  const graph: Graph = { nodes: [], links: [] }
  things.forEach(thing => {
    const uri = asUrl(thing)
    const type = getTerm(thing, rdf.type)?.value ?? ''
    const description = getTerm(thing, rdf.value)?.value ?? ''
    const label = getTerm(thing, rdfs.label)?.value ?? ''
    switch (type) {
      case 'https://terms.math.livegraph.org#Definition':
        graph.nodes.push({
          id: uri,
          type: 'definition',
          label: { en: label },
          description: { en: description },
          dependencies: [],
          dependents: [],
          examples: [],
          created: 0,
          updated: 0,
        })
        break
      case 'https://terms.math.livegraph.org#Statement':
        graph.nodes.push({
          id: uri,
          type: 'statement',
          label: { en: label },
          description: { en: description },
          dependencies: [],
          dependents: [],
          examples: [],
          proofs: [],
          created: 0,
          updated: 0,
        })
        break
      default:
        break
    }
    getTermAll(thing, 'https://terms.math.livegraph.org#dependsOn').forEach(
      dependency => {
        graph.links.push([uri, dependency.value])
      },
    )
  })
  return graph
}

export const findMathDocumentsOfPerson = async (
  webId: string,
): Promise<string[]> => {
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
              .includes('https://terms.math.livegraph.org#Definition'),
          )
          .map(thing => getTermAll(thing, solid.instance))
          .flat()
          .map(a => a.value)
        return mathDocuments
      }
    }
  }
  return ['https://mrkvon.solidcommunity.net/public/math/graph-theory.ttl']
}
