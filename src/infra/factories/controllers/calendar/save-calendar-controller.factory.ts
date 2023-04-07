import { SaveCalendarController } from '@/infra/controllers/calendars/save-calendar.controller'
import { makeGetCalendarByNameUseCaseFactory } from '@/infra/factories/usecases/calendar/get-calendar-by-name-usecase.factory'
import { makeSaveCalendarUseCaseFactory } from '@/infra/factories/usecases/calendar/save-calendar-usecase.factory'

export const makeSaveCalendarControllerFactory = (): SaveCalendarController => {
  const getCalendarByNameUseCase = makeGetCalendarByNameUseCaseFactory()
  const saveCalendarUseCase = makeSaveCalendarUseCaseFactory()
  return new SaveCalendarController(getCalendarByNameUseCase, saveCalendarUseCase)
}
