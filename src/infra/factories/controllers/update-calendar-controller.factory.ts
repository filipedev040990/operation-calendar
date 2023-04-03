import { UpdateCalendarController } from '@/infra/controllers/calendars/update-calendar.controller'
import { makeGetCalendarByNameUseCaseFactory } from '@/infra/factories/usecases/get-calendar-by-name-usecase.factory'
import { makeUpdateCalendarUseCaseFactory } from '@/infra/factories/usecases/update-calendar-usecase.factory'

export const makeUpdateCalendarControllerFactory = (): UpdateCalendarController => {
  const getCalendarByNameUseCase = makeGetCalendarByNameUseCaseFactory()
  const updateCalendarUseCase = makeUpdateCalendarUseCaseFactory()
  return new UpdateCalendarController(getCalendarByNameUseCase, updateCalendarUseCase)
}
