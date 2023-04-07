import { GetEventByNameUseCase } from '@/application/usecases/events/get-event-by-name.usecase'
import { EventRepository } from '@/infra/database/repositories/event.repository'

export const makeGetEventByNameUseCaseFactory = (): GetEventByNameUseCase => {
  const eventRepository = new EventRepository()
  return new GetEventByNameUseCase(eventRepository)
}
