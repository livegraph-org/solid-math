/** Experimental Types
export interface Access {
  [role: string]: string[]
}

export interface Statement {
  uri: string
  doc: Uri
  label: string
  description?: string
}

export interface StatementWithAccess extends Statement {
  access: Access
}

export interface Dependency {
  dependent: Uri
  dependency: Uri
  doc: Uri
}

export interface Document {
  uri: Uri
  access: Access
}

export interface DependencyExtended {
  dependent: StatementWithAccess
  dependency: StatementWithAccess
  doc: Document
}
*/

import { EffectiveAccess } from '@inrupt/solid-client/dist/interfaces'
import { Dictionary } from '../../types'

interface LanguageString extends Dictionary<string> {
  en: string // a default language, we always expect it to be there
  // eventually we'll generalize this
}

interface Node {
  id: string
  description: LanguageString
  label: LanguageString
  type: 'definition' | 'statement'
  created: number
  updated: number
  document: string // solid resource this node is saved at
  // there'll also be citation here
  // examples and proofs will probably extend this
  // and we need to figure out where to keep solid documents
}

interface DefinitionOrStatement extends Node {
  dependencies: string[]
  dependents: string[]
  examples: string[] // to be implemented
}

export interface Definition extends DefinitionOrStatement {
  type: 'definition'
}

export interface Statement extends DefinitionOrStatement {
  type: 'statement'
  proofs: string[] // to be implemented
}

// we use this type for updating the node
export interface PartialNode
  extends Pick<DefinitionOrStatement, 'id' | 'document'>,
    Partial<
      Pick<
        DefinitionOrStatement,
        'label' | 'type' | 'description' | 'dependencies'
      >
    > {}

export interface MathDocument {
  id: string
  uri: string
  access: EffectiveAccess
}
interface EnrichedDefinition
  extends Omit<Definition, 'dependents' | 'dependencies' | 'id' | 'document'> {
  uri: string
  dependents: Dictionary<EnrichedDefinition | EnrichedStatement>
  dependencies: Dictionary<EnrichedDefinition | EnrichedStatement>
  document: MathDocument
}

interface EnrichedStatement
  extends Omit<Statement, 'dependents' | 'dependencies' | 'id' | 'document'> {
  uri: string
  dependents: Dictionary<EnrichedDefinition | EnrichedStatement>
  dependencies: Dictionary<EnrichedDefinition | EnrichedStatement>
  document: MathDocument
}

export type GraphNode = EnrichedDefinition | EnrichedStatement

export type Graph = Dictionary<GraphNode>
