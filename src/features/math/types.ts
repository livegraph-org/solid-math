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

export {}
