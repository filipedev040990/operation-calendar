import { GetCalendarByNameRepository } from '@/application/interfaces'
import { CalendarEntity } from '@/domain/entities/calendar.entity'

export class GetCalendarByName {
  constructor (private readonly calendarRepository: GetCalendarByNameRepository) {}
  async execute (name: string): Promise<CalendarEntity> | null {
    await this.calendarRepository.getByName(name)
    return null
  }
}

describe('GetCalendarByName', () => {
  const name = 'Test'
  const calendarRepository: jest.Mocked<GetCalendarByNameRepository> = {
    getByName: jest.fn().mockResolvedValue(name)
  }
  test('should call CalendarRepository.getByName once and with correct name', async () => {
    const sut = new GetCalendarByName(calendarRepository)

    await sut.execute(name)

    expect(calendarRepository.getByName).toHaveBeenCalledTimes(1)
    expect(calendarRepository.getByName).toHaveBeenCalledWith(name)
  })
})
