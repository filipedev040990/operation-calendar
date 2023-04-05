import { GetEventByNameRepositoryInterface } from '@/application/interfaces/event-repository.interface'
import { GetEventByNameUseCaseInterface } from '@/application/interfaces/event-usecase.interface'
import { EventEntity } from '@/domain/entities/event.entity'

export class GetEventByNameUseCase implements GetEventByNameUseCaseInterface {
  constructor (private readonly enventRepository: GetEventByNameRepositoryInterface) {}
  async execute (name: string): Promise<EventEntity> {
    const calendar = await this.enventRepository.getByName(name)
    return calendar ?? null
  }
}
