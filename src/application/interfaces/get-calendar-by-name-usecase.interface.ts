import { CalendarEntity } from '@/domain/entities/calendar.entity'

export interface GetCalendarByNameUseCaseInterface {
  execute (name: string): Promise<CalendarEntity> | null
}
