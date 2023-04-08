import { GetAllEventsRepositoryInterface } from '@/application/interfaces/event-repository.interface'
import { GetAllEventsUseCaseInterface } from '@/application/interfaces/event-usecase.interface'

export class GetAllEventsUseCase implements GetAllEventsUseCaseInterface {
  constructor (private readonly eventRepository: GetAllEventsRepositoryInterface) {}
  async execute (): Promise<GetAllEventsUseCaseInterface.Output[]> {
    const events = await this.eventRepository.getAll()
    return events ?? null
  }
}
