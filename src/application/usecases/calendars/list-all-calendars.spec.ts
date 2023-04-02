import { ListAllCalendarsRepository } from '@/application/interfaces'
import { CalendarEntity } from '@/domain/entities/calendar.entity'

export class ListAllCalendarsUseCase {
  constructor (private readonly calendarRepository: ListAllCalendarsRepository) {}
  async execute (): Promise<CalendarEntity [] | null> {
    await this.calendarRepository.listAll()
    return null
  }
}

const fakeCalendars: CalendarEntity [] = [
  {
    id: '12345679',
    name: 'Calendar 1',
    created_at: new Date('2023-01-01 15:00:55')
  },
  {
    id: '999999',
    name: 'Calendar 2',
    created_at: new Date('2022-12-31 14:53:15')
  }
]

const calendarRepository: jest.Mocked<ListAllCalendarsRepository> = {
  listAll: jest.fn().mockResolvedValue(fakeCalendars)
}

describe('ListAllCalendarsUseCase', () => {
  test('should call CalendarRepository.listAll once', async () => {
    const sut = new ListAllCalendarsUseCase(calendarRepository)

    await sut.execute()

    expect(calendarRepository.listAll).toHaveBeenCalledTimes(1)
  })
})
