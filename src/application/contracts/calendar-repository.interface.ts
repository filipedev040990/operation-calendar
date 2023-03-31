export interface SaveCalendarRepository {
  save (input: SaveCalendarRepository.Input): Promise<SaveCalendarRepository.Output>
}

export namespace SaveCalendarRepository {
  export type Input = {
    id: string
    name: string
    created_at: Date
  }
  export type Output = {
    id: string
    name: string
    created_at: Date
  }
}
