import { DeleteCalendarUseCase } from '@/application/usecases/calendars/delete-calendar.usecase'
import { CalendarRepository } from '@/infra/database/repositories/calendar.repository'

export const makeDeleteCalendarUseCaseFactory = (): DeleteCalendarUseCase => {
  const calendarRepository = new CalendarRepository()
  return new DeleteCalendarUseCase(calendarRepository)
}
