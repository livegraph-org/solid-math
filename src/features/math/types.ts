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

import { Dictionary } from '../../types'

interface LanguageString extends Dictionary<string> {
  en: string // a default language, we always expect it to be there
  // eventually we'll generalize this
}

interface Node {
  id: string
  description: LanguageString
  label: LanguageString
  type: string
  created: number
  updated: number
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

export interface MathDocument {
  id: string
}

interface EnrichedDefinition
  extends Omit<Definition, 'dependents' | 'dependencies' | 'id'> {
  uri: string
  dependents: Dictionary<EnrichedDefinition | EnrichedStatement>
  dependencies: Dictionary<EnrichedDefinition | EnrichedStatement>
}

interface EnrichedStatement
  extends Omit<Statement, 'dependents' | 'dependencies' | 'id'> {
  uri: string
  dependents: Dictionary<EnrichedDefinition | EnrichedStatement>
  dependencies: Dictionary<EnrichedDefinition | EnrichedStatement>
}

export type GraphNode = EnrichedDefinition | EnrichedStatement

export type Graph = Dictionary<GraphNode>