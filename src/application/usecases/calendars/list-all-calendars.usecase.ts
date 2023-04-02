import { ListAllCalendarsRepository } from '@/application/interfaces'
import { ListAllCalendarsUseCaseInterface } from '@/application/interfaces/list-all-calendars-usecase.interface'
import { CalendarEntity } from '@/domain/entities/calendar.entity'

export class ListAllCalendarsUseCase implements ListAllCalendarsUseCaseInterface {
  constructor (private readonly calendarRepository: ListAllCalendarsRepository) {}
  async execute (): Promise<CalendarEntity [] | null> {
    const calendars = await this.calendarRepository.listAll()
    return calendars ?? null
  }
}
