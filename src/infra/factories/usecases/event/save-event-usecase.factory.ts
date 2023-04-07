import { SaveEventUseCase } from '@/application/usecases/events/save-event.usecase'
import { UUIDGeneratorAdapter } from '@/infra/adapters/uuid-generator.adapter'
import { EventRepository } from '@/infra/database/repositories/event.repository'

export const makeSaveEventUseCaseFactory = (): SaveEventUseCase => {
  const eventRepository = new EventRepository()
  const uuidGenerator = new UUIDGeneratorAdapter()
  return new SaveEventUseCase(eventRepository, uuidGenerator)
}
