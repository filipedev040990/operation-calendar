import { EventEntity } from '@/domain/entities/event.entity'
export interface SaveEventeRepositoryInterface {
  save (input: SaveEventeRepositoryInterface.Input): Promise<SaveEventeRepositoryInterface.Output>
}

export namespace SaveEventeRepositoryInterface {
  export type Input = {
    id: string
    calendar_id: string
    name: string
    category: string
    start_date: Date
    end_date: Date
  }

  export type Output = {
    id: string
    calendar_id: string
    name: string
    category: string
    start_date: Date
    end_date: Date
  }
}

export interface GetEventByNameRepositoryInterface {
  getByName (name: string): Promise<EventEntity | null>
}
