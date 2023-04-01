import { CalendarEntity } from '@/domain/entities/calendar.entity'

export interface SaveCalendarRepositoryInterface {
  save (input: SaveCalendarRepositoryInterface.Input): Promise<SaveCalendarRepositoryInterface.Output>
}

export namespace SaveCalendarRepositoryInterface {
  export type Input = {
    id: string
    name: string
    created_at: Date
  }
  export type Output = Input
}

export interface GetCalendarByNameRepository {
  getByName (name: string): Promise<CalendarEntity> | null
}
