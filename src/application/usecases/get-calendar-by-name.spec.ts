import { GetCalendarByNameRepository } from '@/application/interfaces'
import { CalendarEntity } from '@/domain/entities/calendar.entity'

export class GetCalendarByNameUseCase {
  constructor (private readonly calendarRepository: GetCalendarByNameRepository) {}
  async execute (name: string): Promise<CalendarEntity> | null {
    const calendar = await this.calendarRepository.getByName(name)
    return calendar ?? null
  }
}

describe('GetCalendarByNameUseCase', () => {
  const calendarRepository: jest.Mocked<GetCalendarByNameRepository> = {
    getByName: jest.fn()
  }

  let sut: GetCalendarByNameUseCase
  beforeAll(() => {
    sut = new GetCalendarByNameUseCase(calendarRepository)
  })

  test('should call CalendarRepository.getByName once and with correct name', async () => {
    await sut.execute('Test')

    expect(calendarRepository.getByName).toHaveBeenCalledTimes(1)
    expect(calendarRepository.getByName).toHaveBeenCalledWith('Test')
  })

  test('should return a calendar', async () => {
    calendarRepository.getByName.mockResolvedValueOnce({
      id: '123456789',
      name: 'Test',
      created_at: new Date('2023-01-01 15:11:25')
    })

    const calendar = await sut.execute('Test')

    expect(calendar).toEqual({
      id: '123456789',
      name: 'Test',
      created_at: new Date('2023-01-01 15:11:25')
    })
  })

  test('should return null if CalendarRepository.getByName returns null', async () => {
    const calendar = await sut.execute('Test')

    expect(calendar).toBeNull()
  })
})
