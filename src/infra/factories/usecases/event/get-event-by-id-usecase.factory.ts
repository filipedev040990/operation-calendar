import { GetEventByIdUseCase } from '@/application/usecases/events/get-event-by-id.usecase'
import { EventRepository } from '@/infra/database/repositories/event.repository'

export const makeGetEventByIdUseCaseFactory = (): GetEventByIdUseCase => {
  const eventRepository = new EventRepository()
  return new GetEventByIdUseCase(eventRepository)
}
