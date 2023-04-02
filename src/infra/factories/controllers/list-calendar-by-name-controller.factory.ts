import { ListCalendarByNameController } from '@/infra/controllers/calendars/list-calendar-by-name.controller'
import { makeGetCalendarByNameUseCaseFactory } from '../usecases/get-calendar-by-name-usecase.factory'

export const makeListCalendarByNameControllerFactory = (): ListCalendarByNameController => {
  const getCalendarByNameUseCase = makeGetCalendarByNameUseCaseFactory()
  return new ListCalendarByNameController(getCalendarByNameUseCase)
}
