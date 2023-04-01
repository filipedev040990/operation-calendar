import { SaveCalendarController } from '../../controllers/save-calendar.controller'
import { makeGetCalendarByNameUseCaseFactory } from '../usecases/get-calendar-by-name-usecase.factory'
import { makeSaveCalendarUseCaseFactory } from '../usecases/save-calendar-usecase.factory'

export const makeSaveCalendarControllerFactory = (): SaveCalendarController => {
  const getCalendarByNameUseCase = makeGetCalendarByNameUseCaseFactory()
  const saveCalendarUseCase = makeSaveCalendarUseCaseFactory()
  return new SaveCalendarController(getCalendarByNameUseCase, saveCalendarUseCase)
}
