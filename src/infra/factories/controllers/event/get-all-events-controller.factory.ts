import { GetAllEventsController } from '@/infra/controllers/events/get-all-events.controller'
import { makeGetAllEventsUseCaseFactory } from '../../usecases/event/get-all-events-usecase.factory'

export const makeGetAllEventsControllerFactory = (): GetAllEventsController => {
  const getAllEventsUseCase = makeGetAllEventsUseCaseFactory()
  return new GetAllEventsController(getAllEventsUseCase)
}
