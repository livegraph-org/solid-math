import {
  asUrl,
  getSolidDataset,
  getTerm,
  getTermAll,
  getThing,
  getThingAll,
  saveSolidDatasetAt,
  setStringWithLocale,
  setThing,
  setUrl,
  Thing,
  ThingPersisted,
  UrlString,
} from '@inrupt/solid-client'
import { fetch } from '@inrupt/solid-client-authn-browser'
import { rdf, rdfs } from 'rdf-namespaces'
import { Definition, PartialNode, Statement } from './types'

interface Graph {
  nodes: (Definition | Statement)[]
  links: [string, string][]
}

const term = {
  definition: 'https://terms.math.livegraph.org#Definition',
  statement: 'https://terms.math.livegraph.org#Statement',
  dependsOn: 'https://terms.math.livegraph.org#dependsOn',
}

export const fetchGraph = async (documentUri: UrlString): Promise<Graph> => {
  const dataset = await getSolidDataset(documentUri, { fetch })
  const things = getThingAll(dataset)
  const graph: Graph = { nodes: [], links: [] }
  things.forEach(thing => {
    const node = thingToNode(thing, documentUri)
    graph.nodes.push(node)
    getTermAll(thing, term.dependsOn).forEach(dependency => {
      graph.links.push([node.id, dependency.value])
    })
  })
  return graph
}

export const updateNode = async (
  node: PartialNode,
): Promise<Definition | Statement> => {
  // we want to save any partial data that are provided
  // so how do we do it?

  // save a label

  const dataset = await getSolidDataset(node.document, { fetch })
  const thing = getThing(dataset, node.id) as ThingPersisted
  if (thing) {
    let newThing = thing
    if (node.label) {
      newThing = setStringWithLocale(newThing, rdfs.label, node.label.en, 'en')
    }

    if (node.type) {
      newThing = setUrl(newThing, rdf.type, term[node.type])
    }

    if (node.description) {
      newThing = setStringWithLocale(
        newThing,
        rdf.value,
        node.description.en,
        'en',
      )
    }

    if (newThing !== thing) {
      const newDataset = setThing(dataset, newThing)
      await saveSolidDatasetAt(node.document, newDataset, { fetch })
    }
    return thingToNode(newThing, node.document)
  }
  throw new Error('node to update not found')
}

const thingToNode = (
  thing: Thing,
  document: string,
): Definition | Statement => {
  const uri = asUrl(thing)
  const type = getTerm(thing, rdf.type)?.value ?? ''
  const description = getTerm(thing, rdf.value)?.value ?? ''
  const label = getTerm(thing, rdfs.label)?.value ?? ''
  switch (type) {
    case term.definition:
      return {
        id: uri,
        type: 'definition',
        label: { en: label },
        description: { en: description },
        dependencies: [],
        dependents: [],
        examples: [],
        created: 0,
        updated: 0,
        document,
      }
    case term.statement:
      return {
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
        document,
      }
    default:
      throw new Error('thing is not a Definition or Statement')
  }
}
