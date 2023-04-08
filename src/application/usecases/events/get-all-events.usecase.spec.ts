import { GetAllEventsRepositoryInterface } from '@/application/interfaces/event-repository.interface'
import { GetAllEventsUseCaseInterface } from '@/application/interfaces/event-usecase.interface'

export class GetAllEventsUseCase implements GetAllEventsUseCaseInterface {
  constructor (private readonly eventRepository: GetAllEventsRepositoryInterface) {}
  async execute (): Promise<GetAllEventsUseCaseInterface.Output> {
    await this.eventRepository.getAll()
    return null
  }
}

const eventRepository: jest.Mocked<GetAllEventsRepositoryInterface> = {
  getAll: jest.fn().mockResolvedValue({
    event_id: 'anyEventId',
    event_name: 'anyEventName',
    start_date: new Date('2023-01-01 15:20:15'),
    end_date: new Date('2023-01-01 15:20:15'),
    calendar_id: 'anyCalendarId',
    calendar_name: 'anyCalendarName'
  })
}

describe('GetAllEventsUseCase', () => {
  test('should call EventsRepository.getAll once', async () => {
    const sut = new GetAllEventsUseCase(eventRepository)

    await sut.execute()

    expect(eventRepository.getAll).toHaveBeenCalledTimes(1)
  })
})
