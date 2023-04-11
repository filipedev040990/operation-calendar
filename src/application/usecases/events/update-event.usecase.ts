import { UpdateEventeRepositoryInterface } from '@/application/interfaces/event-repository.interface'
import { UpdateEventUseCaseInterface } from '@/application/interfaces/event-usecase.interface'
import { EventEntity } from '@/domain/entities/event.entity'

export class UpdateEventUseCase implements UpdateEventUseCaseInterface {
  constructor (private readonly eventRepository: UpdateEventeRepositoryInterface) {}
  async execute (input: UpdateEventUseCaseInterface.Input): Promise<UpdateEventUseCaseInterface.Output> {
    const endDate = input.end_date ?? input.start_date
    const event = new EventEntity({
      id: input.id,
      calendar_id: input.calendar_id,
      name: input.name,
      category: input.category,
      start_date: new Date(input.start_date),
      end_date: new Date(endDate)
    })

    return await this.eventRepository.update(event)
  }
}
