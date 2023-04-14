import { DeleteEventRepositoryInterface } from '@/application/interfaces/event-repository.interface'
import { DeleteEventUseCaseInterface } from '@/application/interfaces/event-usecase.interface'

export class DeleteEventUseCase implements DeleteEventUseCaseInterface {
  constructor (private readonly eventRepository: DeleteEventRepositoryInterface) {}
  async execute (id: string): Promise<void> {
    await this.eventRepository.delete(id)
  }
}
