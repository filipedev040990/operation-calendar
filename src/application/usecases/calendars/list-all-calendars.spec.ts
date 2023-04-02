import { ListAllCalendarsRepository } from '@/application/interfaces'
import { CalendarEntity } from '@/domain/entities/calendar.entity'

export class ListAllCalendarsUseCase {
  constructor (private readonly calendarRepository: ListAllCalendarsRepository) {}
  async execute (): Promise<CalendarEntity [] | null> {
    const calendars = await this.calendarRepository.listAll()
    return calendars ?? null
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
  let sut: ListAllCalendarsUseCase
  beforeAll(() => {
    sut = new ListAllCalendarsUseCase(calendarRepository)
  })
  test('should call CalendarRepository.listAll once', async () => {
    await sut.execute()

    expect(calendarRepository.listAll).toHaveBeenCalledTimes(1)
  })

  test('should return all calendars', async () => {
    const calendars = await sut.execute()

    expect(calendars).toEqual(fakeCalendars)
  })

  test('should return null if CalendarRepository.listAll returns null', async () => {
    calendarRepository.listAll.mockResolvedValueOnce(undefined)

    const calendars = await sut.execute()

    expect(calendars).toBeNull()
  })
})
