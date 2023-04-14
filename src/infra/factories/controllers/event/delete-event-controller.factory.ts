import { DeleteEventController } from '@/infra/controllers/events/delete-event.controller'
import { makeDeleteEventUseCaseFactory } from '../../usecases/event/delete-event-usecase.factory'
import { makeGetEventByIdUseCaseFactory } from '../../usecases/event/get-event-by-id-usecase.factory'

export const makeDeleteEventControllerFactory = (): DeleteEventController => {
  const getEventById = makeGetEventByIdUseCaseFactory()
  const deleteEventUseCase = makeDeleteEventUseCaseFactory()
  return new DeleteEventController(getEventById, deleteEventUseCase)
}
