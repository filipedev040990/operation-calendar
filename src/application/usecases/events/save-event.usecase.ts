import { UUIDGeneratorInterface } from '@/application/interfaces'
import { SaveEventeRepositoryInterface } from '@/application/interfaces/event-repository.interface'
import { SaveEventUseCaseInterface, SaveEvent } from '@/application/interfaces/event-usecase.interface'
import { EventEntity } from '@/domain/entities/event.entity'

export class SaveEventUseCase implements SaveEventUseCaseInterface {
  constructor (private readonly eventRepository: SaveEventeRepositoryInterface, private readonly uuidGenerator: UUIDGeneratorInterface) {}
  async execute (input: SaveEvent.Input): Promise<SaveEvent.Output> {
    const endDate = input.end_date ?? input.start_date
    const event = new EventEntity({
      id: this.uuidGenerator.uuid(),
      calendar_id: input.calendar_id,
      name: input.name,
      category: input.category,
      start_date: new Date(input.start_date),
      end_date: new Date(endDate)
    })

    return await this.eventRepository.save(event)
  }
}
