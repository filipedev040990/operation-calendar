import { EventEntity } from '@/domain/entities/event.entity'

export interface SaveEventUseCaseInterface {
  execute(input: SaveEvent.Input): Promise<SaveEvent.Output>
}

export namespace SaveEvent {
  export type Input = {
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

export interface GetEventByNameUseCaseInterface {
  execute(name: string): Promise<EventEntity | null>
}
