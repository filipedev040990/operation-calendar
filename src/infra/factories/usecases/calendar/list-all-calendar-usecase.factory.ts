import { ListAllCalendarsUseCaseInterface } from '@/application/interfaces'
import { ListAllCalendarsUseCase } from '@/application/usecases/calendars/list-all-calendars.usecase'
import { CalendarRepository } from '@/infra/database/repositories/calendar.repository'

export const makeListAllCalendarsUseCaseFactory = (): ListAllCalendarsUseCaseInterface => {
  const calendarRepository = new CalendarRepository()
  return new ListAllCalendarsUseCase(calendarRepository)
}
