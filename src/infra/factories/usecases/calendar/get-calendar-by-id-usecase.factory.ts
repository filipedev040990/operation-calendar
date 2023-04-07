import { GetCalendarByIdUseCase } from '@/application/usecases/calendars/get-calendar-by-id.usecase'
import { CalendarRepository } from '@/infra/database/repositories/calendar.repository'

export const makeGetCalendarByIdUseCaseFactory = (): GetCalendarByIdUseCase => {
  const calendarRepositoty = new CalendarRepository()
  return new GetCalendarByIdUseCase(calendarRepositoty)
}
