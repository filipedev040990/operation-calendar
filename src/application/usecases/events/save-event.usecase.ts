import { SaveEventeRepositoryInterface } from '@/application/interfaces/event-repository.interface'
import { SaveEventUseCaseInterface, SaveEvent } from '@/application/interfaces/event-usecase.interface'
import { EventEntity } from '@/domain/entities/event.entity'

export class SaveEventUseCase implements SaveEventUseCaseInterface {
  constructor (private readonly eventRepository: SaveEventeRepositoryInterface) {}
  async execute (input: SaveEvent.Input): Promise<SaveEvent.Output> {
    const event = new EventEntity({
      id: input.id,
      calendar_id: input.calendar_id,
      name: input.name,
      category: input.category,
      start_date: input.start_date,
      end_date: input.end_date ?? input.start_date
    })

    return await this.eventRepository.save(event)
  }
}
