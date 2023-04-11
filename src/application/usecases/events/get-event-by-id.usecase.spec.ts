import { GetEventByIdRepositoryInterface } from '@/application/interfaces/event-repository.interface'
import { GetEventByIdUseCaseInterface } from '@/application/interfaces/event-usecase.interface'
import { EventEntity } from '@/domain/entities/event.entity'

export class GetEventByIdUseCase implements GetEventByIdUseCaseInterface {
  constructor (private readonly eventRepository: GetEventByIdRepositoryInterface) {}
  async execute (id: string): Promise<EventEntity | null> {
    const event = await this.eventRepository.getById(id)
    return event ?? null
  }
}

const eventRepository: jest.Mocked<GetEventByIdRepositoryInterface> = {
  getById: jest.fn().mockResolvedValue({
    id: 'anyId',
    calendar_id: 'anyCalendarId',
    category: 'NORMAL',
    name: 'anyName',
    start_date: new Date('2023-01-01'),
    end_date: new Date('2023-01-03')
  })
}

describe('GetEventByIdUseCase', () => {
  let sut: GetEventByIdUseCase
  beforeAll(() => {
    sut = new GetEventByIdUseCase(eventRepository)
  })

  test('should call EventRepository.getById once and with correct id', async () => {
    await sut.execute('anyId')

    expect(eventRepository.getById).toHaveBeenCalledTimes(1)
    expect(eventRepository.getById).toHaveBeenCalledWith('anyId')
  })

  test('should return null if EventRepository.getById returns null', async () => {
    eventRepository.getById.mockResolvedValueOnce(null)

    const response = await sut.execute('anyId')

    expect(response).toBeNull()
  })

  test('should return an Event', async () => {
    const response = await sut.execute('anyId')

    expect(response).toEqual({
      id: 'anyId',
      calendar_id: 'anyCalendarId',
      category: 'NORMAL',
      name: 'anyName',
      start_date: new Date('2023-01-01'),
      end_date: new Date('2023-01-03')
    })
  })
})
