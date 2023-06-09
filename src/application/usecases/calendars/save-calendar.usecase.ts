import { CalendarEntity } from '@/domain/entities/calendar.entity'
import { SaveCalendarRepositoryInterface, UUIDGeneratorInterface, SaveCalendarUseCaseInterface } from '@/application/interfaces'

export class SaveCalendarUseCase implements SaveCalendarUseCaseInterface {
  constructor (
    private readonly calendarRepository: SaveCalendarRepositoryInterface,
    private readonly uuidGenerator: UUIDGeneratorInterface
  ) {}

  async execute (input: { name: string }): Promise<CalendarEntity.Output> {
    const calendar = new CalendarEntity({ id: this.uuidGenerator.uuid(), name: input.name })
    return await this.calendarRepository.save(calendar)
  }
}
