import { DeleteEventController } from '@/infra/controllers/events/delete-event.controller'
import { makeDeleteEventUseCaseFactory } from '../../usecases/event/delete-event-usecase.factory'

export const makeDeleteEventControllerFactory = (): DeleteEventController => {
  const deleteEventUseCase = makeDeleteEventUseCaseFactory()
  return new DeleteEventController(deleteEventUseCase)
}
