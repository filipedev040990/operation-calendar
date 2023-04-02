import { GetCalendarByNameRepository } from '@/application/interfaces'
import { CalendarEntity } from '@/domain/entities/calendar.entity'
import { GetCalendarByNameUseCaseInterface } from '@/application/interfaces/get-calendar-by-name-usecase.interface'

export class GetCalendarByNameUseCase implements GetCalendarByNameUseCaseInterface {
  constructor (private readonly calendarRepository: GetCalendarByNameRepository) {}
  async execute (name: string): Promise<CalendarEntity> | null {
    const calendar = await this.calendarRepository.getByName(name)
    return calendar ?? null
  }
}
