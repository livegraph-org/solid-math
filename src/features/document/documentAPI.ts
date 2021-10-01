import {
  buildThing,
  createSolidDataset,
  createThing,
  getEffectiveAccess,
  getSolidDataset,
  getTerm,
  getTermAll,
  getThing,
  getThingAll,
  saveSolidDatasetAt,
  setThing,
} from '@inrupt/solid-client'
import { fetch } from '@inrupt/solid-client-authn-browser'
import { EffectiveAccess } from '@inrupt/solid-client/dist/interfaces'
import { dct, rdf, solid } from 'rdf-namespaces'
import { MathDocument } from '../math/types'

export const findMathDocumentsOfPerson = async (
  webId: string,
): Promise<MathDocument[]> => {
  let documentUris: string[] = []
  if (webId) {
    const { public: publicTypeIndex } = await getTypeIndexes(webId)
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

      documentUris = mathDocuments
    }
  }
  if (documentUris.length === 0)
    documentUris = [
      'https://mrkvon.solidcommunity.net/public/math/graph-theory.ttl',
    ]

  const accesses: Record<string, EffectiveAccess> = Object.fromEntries(
    await Promise.all(
      documentUris.map(async uri => {
        const dataset = await getSolidDataset(uri, { fetch })
        const rights = getEffectiveAccess(dataset)
        return [uri, rights]
      }),
    ),
  )

  return documentUris.map(uri => ({ id: uri, uri, access: accesses[uri] }))
}

export const createMathDocument = async (
  uri: string,
  webId: string,
  isPublic: boolean,
): Promise<MathDocument> => {
  try {
    await getSolidDataset(uri, { fetch })
  } catch (error) {
    // save the solid dataset to the new place
    await saveSolidDatasetAt(uri, createSolidDataset(), {
      fetch,
    })

    // fetch it to obtain access info
    const newDataset = await getSolidDataset(uri, { fetch })

    const mathDocument: MathDocument = {
      id: uri,
      uri,
      access: getEffectiveAccess(newDataset),
    }

    // save the info to the publicTypeIndex or privateTypeIndex of logged user
    const typeIndexes = await getTypeIndexes(webId)

    const typeIndex = isPublic ? typeIndexes.public : typeIndexes.private

    if (typeIndex) {
      const dataset = await getSolidDataset(typeIndex, { fetch })

      const indexThing =
        getThing(dataset, typeIndex) ?? createThing({ url: typeIndex })

      const thingUrl = `${typeIndex}#${Date.now()}` // @TODO could be more expressive, like filename

      const index = buildThing(indexThing)
        .addUrl(dct.references, thingUrl)
        .build()

      const file = buildThing(createThing({ url: thingUrl }))
        .addUrl(rdf.type, solid.TypeRegistration)
        .addUrl(solid.forClass, 'https://terms.math.livegraph.org#Definition')
        .addUrl(solid.forClass, 'https://terms.math.livegraph.org#Statement')
        .addUrl(solid.instance, uri)
        .build()

      const updatedDataset = setThing(setThing(dataset, index), file)
      await saveSolidDatasetAt(typeIndex, updatedDataset, {
        fetch,
      })
    }
    return mathDocument
  }
  throw new Error('document already exists')
}

interface TypeIndexes {
  public: string
  private: string
}

const getTypeIndexes = async (webId: string): Promise<TypeIndexes> => {
  const dataset = await getSolidDataset(webId, { fetch })
  const me = getThing(dataset, webId)
  const response: TypeIndexes = {
    public: '',
    private: '',
  }
  if (me) {
    response.public = getTerm(me, solid.publicTypeIndex)?.value ?? ''
    response.private = getTerm(me, solid.privateTypeIndex)?.value ?? ''
  }

  return response
}
