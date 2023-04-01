import { GetCalendarByNameRepository } from '@/application/interfaces'
import { CalendarEntity } from '@/domain/entities/calendar.entity'

export class GetCalendarByNameUseCase {
  constructor (private readonly calendarRepository: GetCalendarByNameRepository) {}
  async execute (name: string): Promise<CalendarEntity> | null {
    return await this.calendarRepository.getByName(name)
  }
}

describe('GetCalendarByNameUseCase', () => {
  const calendarRepository: jest.Mocked<GetCalendarByNameRepository> = {
    getByName: jest.fn()
  }
  test('should call CalendarRepository.getByName once and with correct name', async () => {
    const sut = new GetCalendarByNameUseCase(calendarRepository)

    await sut.execute('Test')

    expect(calendarRepository.getByName).toHaveBeenCalledTimes(1)
    expect(calendarRepository.getByName).toHaveBeenCalledWith('Test')
  })

  test('should return a calendar', async () => {
    calendarRepository.getByName.mockResolvedValueOnce({
      id: '123456789',
      name: 'Test',
      created_at: new Date('2023-01-01')
    })

    const sut = new GetCalendarByNameUseCase(calendarRepository)

    const calendar = await sut.execute('Test')

    expect(calendar).toEqual({
      id: '123456789',
      name: 'Test',
      created_at: new Date('2023-01-01')
    })
  })
})
