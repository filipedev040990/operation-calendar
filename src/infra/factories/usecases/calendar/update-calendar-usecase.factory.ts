import { UpdateCalendarUseCase } from '@/application/usecases/calendars/update-calendar.usecase'
import { CalendarRepository } from '@/infra/database/repositories/calendar.repository'

export const makeUpdateCalendarUseCaseFactory = (): UpdateCalendarUseCase => {
  const calendarRepository = new CalendarRepository()
  return new UpdateCalendarUseCase(calendarRepository)
}
