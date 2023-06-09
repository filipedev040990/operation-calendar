import { GetCalendarByIdRepositoryInterface, GetCalendarByIdUseCaseInterface } from '@/application/interfaces'
import { CalendarEntity } from '@/domain/entities/calendar.entity'

export class GetCalendarByIdUseCase implements GetCalendarByIdUseCaseInterface {
  constructor (private readonly calendarRepository: GetCalendarByIdRepositoryInterface) {}
  async execute (id: string): Promise<CalendarEntity.Output> {
    const calendar = await this.calendarRepository.getById(id)
    return calendar ?? null
  }
}
