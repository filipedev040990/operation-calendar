import { GetCalendarByIdRepository } from '@/application/interfaces'
import { GetCalendarByIdUseCase } from './get-calendar-by-id.usecase'

const calendarRepository: jest.Mocked<GetCalendarByIdRepository> = {
  getById: jest.fn().mockResolvedValue({
    id: 'anyId',
    name: 'any Name',
    created_at: new Date('2023-01-01 19:56:10')
  })
}

describe('GetCalendarByIdUseCase', () => {
  let sut: GetCalendarByIdUseCase
  beforeAll(() => {
    sut = new GetCalendarByIdUseCase(calendarRepository)
  })

  test('should call CalendarRepository.getById once and with correct id', async () => {
    await sut.execute('anyId')

    expect(calendarRepository.getById).toHaveBeenCalledTimes(1)
    expect(calendarRepository.getById).toHaveBeenCalledWith('anyId')
  })

  test('should return null if CalendarRepository.getById returns null or undefined', async () => {
    calendarRepository.getById.mockResolvedValueOnce(null)
    const response = await sut.execute('anyId')

    expect(response).toBeNull()
  })

  test('should return an calendar if exists', async () => {
    const response = await sut.execute('anyId')

    expect(response).toEqual({
      id: 'anyId',
      name: 'any Name',
      created_at: new Date('2023-01-01 19:56:10')
    })
  })
})
