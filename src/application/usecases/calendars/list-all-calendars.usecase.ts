import { ListAllCalendarsRepository } from '@/application/interfaces'
import { CalendarEntity } from '@/domain/entities/calendar.entity'

export class ListAllCalendarsUseCase {
  constructor (private readonly calendarRepository: ListAllCalendarsRepository) {}
  async execute (): Promise<CalendarEntity [] | null> {
    const calendars = await this.calendarRepository.listAll()
    return calendars ?? null
  }
}
