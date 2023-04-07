import { DeleteCalendarController } from '@/infra/controllers/calendars/delete-calendar.controller'
import { makeGetCalendarByIdUseCaseFactory } from '@/infra/factories/usecases/calendar/get-calendar-by-id-usecase.factory'
import { makeDeleteCalendarUseCaseFactory } from '@/infra/factories/usecases/calendar/delete-calendar-usecase.factory'

export const makeDeleteCalendarControllerFactory = (): DeleteCalendarController => {
  const getCalendarByIdUseCase = makeGetCalendarByIdUseCaseFactory()
  const deleteCalendarUseCase = makeDeleteCalendarUseCaseFactory()
  return new DeleteCalendarController(getCalendarByIdUseCase, deleteCalendarUseCase)
}
