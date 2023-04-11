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

export interface GetAllEventsRepositoryInterface {
  getAll (): Promise<GetAllEventsRepositoryInterface.Output []>
}

export namespace GetAllEventsRepositoryInterface {
  export type Output = {
    event_id: string
    event_name: string
    start_date: Date
    end_date: Date
    calendar_id: string
    calendar_name: string
  }
}

export interface GetEventByIdRepositoryInterface {
  getById (id: string): Promise<EventEntity | null>
}
