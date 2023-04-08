import { GetAllEventsUseCase } from '@/application/usecases/events/get-all-events.usecase'
import { EventRepository } from '@/infra/database/repositories/event.repository'

export const makeGetAllEventsUseCaseFactory = (): GetAllEventsUseCase => {
  const eventRepository = new EventRepository()
  return new GetAllEventsUseCase(eventRepository)
}
