import { EventEntity } from '@/domain/entities/event.entity'
import { CategoryOptions } from './event-usecase.interface'
import { CalendarEntity } from '@/domain/entities/calendar.entity'
export interface SaveEventeRepositoryInterface {
  save (input: SaveEventeRepositoryInterface.Input): Promise<SaveEventeRepositoryInterface.Output>
}

export namespace SaveEventeRepositoryInterface {
  export type Input = {
    id: string
    calendar_id: string
    name: string
    category: CategoryOptions
    start_date: Date
    end_date: Date
  }

  export type Output = {
    id: string
    calendar: CalendarEntity.Output
    name: string
    category: string
    start_date: Date
    end_date: Date
  }
}

export interface GetEventByNameRepositoryInterface {
  getByName (name: string): Promise<EventEntity | null>
}
