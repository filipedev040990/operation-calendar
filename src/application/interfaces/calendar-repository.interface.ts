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
  getByName (name: string): Promise<CalendarEntity | null>
}

export interface ListAllCalendarsRepository {
  listAll (): Promise<CalendarEntity [] | null>
}

export interface UpdateCalendarRepositoryInterface {
  update (input: UpdateCalendarRepositoryInterface.Input): Promise<UpdateCalendarRepositoryInterface.Output>
}

export namespace UpdateCalendarRepositoryInterface {
  export type Input = {
    id: string
    name: string
  }
  export type Output = {
    id: string
    name: string
    created_at: Date
  }
}
export interface GetCalendarByIdRepositoryInterface {
  getById (id: string): Promise<CalendarEntity> | null
}

export interface DeleteCalendarRepositoryInterface {
  delete (id: string): Promise<void>
}
