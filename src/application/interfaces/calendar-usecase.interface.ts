import { CalendarEntity } from '@/domain/entities/calendar.entity'

export interface GetCalendarByNameUseCaseInterface {
  execute (name: string): Promise<CalendarEntity | null>
}

export interface ListAllCalendarsUseCaseInterface {
  execute (): Promise<CalendarEntity [] | null >
}

export interface SaveCalendarUseCaseInterface {
  execute (input: { name: string }): Promise<CalendarEntity.Output>
}

export interface UpdateCalendarUseCaseInterface {
  execute(input: UpdateCalendarUseCaseInterface.Input): Promise<UpdateCalendarUseCaseInterface.Output>
}

export namespace UpdateCalendarUseCaseInterface {
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

export interface GetCalendarByIdUseCaseInterface {
  execute (id: string): Promise<CalendarEntity.Output | null>
}
