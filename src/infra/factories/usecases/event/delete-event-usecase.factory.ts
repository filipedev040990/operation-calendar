import { DeleteEventUseCase } from '@/application/usecases/events/delete-event.usecase'
import { EventRepository } from '@/infra/database/repositories/event.repository'

export const makeDeleteEventUseCaseFactory = (): DeleteEventUseCase => {
  const eventRepository = new EventRepository()
  return new DeleteEventUseCase(eventRepository)
}
