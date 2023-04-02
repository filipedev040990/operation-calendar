import { CalendarEntity } from '@/domain/entities/calendar.entity'

export interface ListAllCalendarsUseCaseInterface {
  execute (): Promise<CalendarEntity [] | null >
}
