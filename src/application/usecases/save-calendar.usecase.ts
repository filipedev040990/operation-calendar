import { CalendarEntity } from '@/domain/entities/calendar.entity'
import { SaveCalendarRepository } from '../interfaces/calendar-repository.interface'
import { UUIDGenerator } from '../interfaces/uuid-generator.interface'

export class SaveCalendarUseCase {
  constructor (
    private readonly calendarRepository: SaveCalendarRepository,
    private readonly uuidGenerator: UUIDGenerator
  ) {}

  async execute (input: { name: string }): Promise<CalendarEntity.Output> {
    const calendar = new CalendarEntity({ id: this.uuidGenerator.uuid(), name: input.name })
    return await this.calendarRepository.save(calendar)
  }
}
