import { GetEventByIdRepositoryInterface } from '@/application/interfaces/event-repository.interface'
import { GetEventByIdUseCaseInterface } from '@/application/interfaces/event-usecase.interface'
import { EventEntity } from '@/domain/entities/event.entity'

export class GetEventByIdUseCase implements GetEventByIdUseCaseInterface {
  constructor (private readonly eventRepository: GetEventByIdRepositoryInterface) {}
  async execute (id: string): Promise<EventEntity | null> {
    const event = await this.eventRepository.getById(id)
    return event ?? null
  }
}
