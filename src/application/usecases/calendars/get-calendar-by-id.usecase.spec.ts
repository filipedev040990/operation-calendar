import { GetCalendarByIdRepository, GetCalendarByIdUseCaseInterface } from '@/application/interfaces'
import { CalendarEntity } from '@/domain/entities/calendar.entity'

export class GetCalendarByIdUseCase implements GetCalendarByIdUseCaseInterface {
  constructor (private readonly calendarRepository: GetCalendarByIdRepository) {}
  async execute (id: string): Promise<CalendarEntity.Output> {
    await this.calendarRepository.getById(id)
    return null
  }
}

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
})
