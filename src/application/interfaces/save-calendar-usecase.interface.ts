import { CalendarEntity } from '@/domain/entities/calendar.entity'

export interface SaveCalendarUseCaseInterface {
  execute (input: { name: string }): Promise<CalendarEntity.Output>
}
