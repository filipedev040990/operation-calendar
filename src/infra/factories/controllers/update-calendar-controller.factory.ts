import { UpdateCalendarController } from '@/infra/controllers/calendars/update-calendar.controller'
import { makeGetCalendarByNameUseCaseFactory } from '@/infra/factories/usecases/get-calendar-by-name-usecase.factory'
import { makeUpdateCalendarUseCaseFactory } from '@/infra/factories/usecases/update-calendar-usecase.factory'
import { makeGetCalendarByIdUseCaseFactory } from '../usecases/get-calendar-by-id-usecase.factory'

export const makeUpdateCalendarControllerFactory = (): UpdateCalendarController => {
  const getCalendarByNameUseCase = makeGetCalendarByNameUseCaseFactory()
  const updateCalendarUseCase = makeUpdateCalendarUseCaseFactory()
  const getCalendarByIdUseCase = makeGetCalendarByIdUseCaseFactory()
  return new UpdateCalendarController(getCalendarByNameUseCase, updateCalendarUseCase, getCalendarByIdUseCase)
}
