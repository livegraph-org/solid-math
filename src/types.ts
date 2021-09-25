export interface Dictionary<T> {
  [key: string]: T
}

export interface Entity<EntityType> {
  byId: Dictionary<EntityType>
  allIds: string[]
}
