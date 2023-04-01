import { GetCalendarByNameRepository } from '@/application/interfaces'
import { CalendarEntity } from '@/domain/entities/calendar.entity'

export class GetCalendarByNameUseCase {
  constructor (private readonly calendarRepository: GetCalendarByNameRepository) {}
  async execute (name: string): Promise<CalendarEntity> | null {
    const calendar = await this.calendarRepository.getByName(name)
    return calendar ?? null
  }
}
