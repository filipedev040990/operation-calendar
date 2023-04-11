import { UpdateEventUseCase } from '@/application/usecases/events/update-event.usecase'
import { EventRepository } from '@/infra/database/repositories/event.repository'

export const makeUpdateEventUseCaseFactory = (): UpdateEventUseCase => {
  const eventRepository = new EventRepository()
  return new UpdateEventUseCase(eventRepository)
}
