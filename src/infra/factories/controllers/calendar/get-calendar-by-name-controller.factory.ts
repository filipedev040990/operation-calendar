
import { GetCalendarByNameController } from '@/infra/controllers/calendars/get-calendar-by-name.controller'
import { makeGetCalendarByNameUseCaseFactory } from '../usecases/get-calendar-by-name-usecase.factory'

export const makeGetCalendarByNameControllerFactory = (): GetCalendarByNameController => {
  const getCalendarByNameUseCase = makeGetCalendarByNameUseCaseFactory()
  return new GetCalendarByNameController(getCalendarByNameUseCase)
}
