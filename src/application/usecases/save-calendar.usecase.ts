import { CalendarEntity } from '@/domain/entities/calendar.entity'
import { SaveCalendarRepository } from '../contracts/calendar-repository.interface'
import { UUIDGenerator } from '../contracts/uuid-generator.interface'

export class SaveCalendarUseCase {
  constructor (
    private readonly calendarRepository: SaveCalendarRepository,
    private readonly uuidGenerator: UUIDGenerator
  ) {}

  async execute (input: { name: string }): Promise<void> {
    const calendar = new CalendarEntity({ id: this.uuidGenerator.uuid(), name: input.name })
    await this.calendarRepository.save(calendar)
  }
}
