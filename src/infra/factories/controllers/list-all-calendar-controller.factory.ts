import { ListAllCalendarsController } from '@/infra/controllers/calendars/list-all-calendars.controller'
import { makeListAllCalendarsUseCaseFactory } from '../usecases/list-all-calendar-usecase.factory'

export const makeListAllCalendarsControllerFactory = (): ListAllCalendarsController => {
  const listAllCalendarsUseCase = makeListAllCalendarsUseCaseFactory()
  return new ListAllCalendarsController(listAllCalendarsUseCase)
}
