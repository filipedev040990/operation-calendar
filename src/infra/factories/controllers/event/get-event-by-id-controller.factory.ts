import { GetEventByIdController } from '@/infra/controllers/events/get-event-by-id.controller'
import { makeGetEventByIdUseCaseFactory } from '../../usecases/event/get-event-by-id-usecase.factory'

export const makeGetEventByIdControllerFactory = (): GetEventByIdController => {
  const getEventByIdUseCase = makeGetEventByIdUseCaseFactory()
  return new GetEventByIdController(getEventByIdUseCase)
}
