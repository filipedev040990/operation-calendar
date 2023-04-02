
import { SaveCalendarUseCase } from '@/application/usecases/calendars/save-calendar.usecase'
import { UUIDGeneratorAdapter } from '@/infra/adapters/uuid-generator.adapter'
import { CalendarRepository } from '@/infra/database/repositories/calendar.repository'

export const makeSaveCalendarUseCaseFactory = (): SaveCalendarUseCase => {
  const calendarRepository = new CalendarRepository()
  const uuidGenerator = new UUIDGeneratorAdapter()
  return new SaveCalendarUseCase(calendarRepository, uuidGenerator)
}
