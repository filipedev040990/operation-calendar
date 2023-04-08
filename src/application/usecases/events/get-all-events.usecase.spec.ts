import { GetAllEventsRepositoryInterface } from '@/application/interfaces/event-repository.interface'
import { GetAllEventsUseCase } from './get-all-events.usecase'

const fakeEvents = [{
  event_id: 'anyEventId',
  event_name: 'anyEventName',
  start_date: new Date('2023-01-01 15:20:15'),
  end_date: new Date('2023-01-01 15:20:15'),
  calendar_id: 'anyCalendarId',
  calendar_name: 'anyCalendarName'
}]

const eventRepository: jest.Mocked<GetAllEventsRepositoryInterface> = {
  getAll: jest.fn().mockResolvedValue(fakeEvents)
}

describe('GetAllEventsUseCase', () => {
  let sut: GetAllEventsUseCase

  beforeAll(() => {
    sut = new GetAllEventsUseCase(eventRepository)
  })

  test('should call EventsRepository.getAll once', async () => {
    await sut.execute()

    expect(eventRepository.getAll).toHaveBeenCalledTimes(1)
  })

  test('should return all events', async () => {
    const response = await sut.execute()

    expect(response).toEqual(fakeEvents)
  })

  test('should return null if EventRepository.getAll returns null', async () => {
    eventRepository.getAll.mockResolvedValueOnce(null)

    const response = await sut.execute()

    expect(response).toBeNull()
  })
})
