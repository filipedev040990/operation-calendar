
import { GetCalendarByNameUseCase } from '@/application/usecases/calendars/get-calendar-by-name.usecase'
import { CalendarRepository } from '@/infra/database/repositories/calendar.repository'

export const makeGetCalendarByNameUseCaseFactory = (): GetCalendarByNameUseCase => {
  const calendarRepository = new CalendarRepository()
  return new GetCalendarByNameUseCase(calendarRepository)
}
