import {
  buildThing,
  createSolidDataset,
  createThing,
  getSolidDataset,
  getTerm,
  getTermAll,
  getThing,
  getThingAll,
  saveSolidDatasetAt,
  setThing,
} from '@inrupt/solid-client'
import { fetch } from '@inrupt/solid-client-authn-browser'
import { rdf } from '@inrupt/solid-client/dist/constants'
import { dct, solid } from 'rdf-namespaces'

export const findMathDocumentsOfPerson = async (
  webId: string,
): Promise<string[]> => {
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
      return mathDocuments
    }
  }
  return ['https://mrkvon.solidcommunity.net/public/math/graph-theory.ttl']
}

export const createMathDocument = async (
  uri: string,
  webId: string,
  isPublic: boolean,
) => {
  try {
    await getSolidDataset(uri, { fetch })
    throw new Error('document already exists')
  } catch (error) {
    await saveSolidDatasetAt(uri, createSolidDataset(), { fetch })

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
      await saveSolidDatasetAt(typeIndex, updatedDataset, { fetch })
    }
  }
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
