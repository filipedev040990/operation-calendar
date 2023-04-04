import { CalendarEntity } from '@/domain/entities/calendar.entity'

export interface SaveEventUseCaseInterface {
  execute(input: SaveEvent.Input): Promise<SaveEvent.Output>
}

export type CategoryOptions = 'NORMAL' | 'WARNING' | 'CRITICAL'

export namespace SaveEvent {
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
