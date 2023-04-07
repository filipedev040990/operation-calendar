import { SaveEventController } from '@/infra/controllers/events/save-event.controller'
import { makeGetCalendarByIdUseCaseFactory } from '../../usecases/calendar/get-calendar-by-id-usecase.factory'
import { makeGetEventByNameUseCaseFactory } from '../../usecases/event/get-event-by-name-usecase.factory'
import { makeSaveEventUseCaseFactory } from '../../usecases/event/save-event-usecase.factory'

export const makeSaveEventControllerFactory = (): SaveEventController => {
  const getCalendarByIdUseCase = makeGetCalendarByIdUseCaseFactory()
  const getEventByNameUseCase = makeGetEventByNameUseCaseFactory()
  const saveEventUseCase = makeSaveEventUseCaseFactory()
  return new SaveEventController(getCalendarByIdUseCase, getEventByNameUseCase, saveEventUseCase)
}
