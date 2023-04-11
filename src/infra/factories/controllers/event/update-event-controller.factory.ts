import { UpdateEventController } from '@/infra/controllers/events/update-event.controller'
import { makeGetCalendarByIdUseCaseFactory } from '../../usecases/calendar/get-calendar-by-id-usecase.factory'
import { makeUpdateEventUseCaseFactory } from '../../usecases/event/update-event-usecase.factory'
import { makeGetEventByNameUseCaseFactory } from '../../usecases/event/get-event-by-name-usecase.factory'

export const makeUpdateEventControllerFactory = (): UpdateEventController => {
  const calendarRepository = makeGetCalendarByIdUseCaseFactory()
  const getEventByNameUseCase = makeGetEventByNameUseCaseFactory()
  const updateEventUseCase = makeUpdateEventUseCaseFactory()
  return new UpdateEventController(calendarRepository, getEventByNameUseCase, updateEventUseCase)
}
