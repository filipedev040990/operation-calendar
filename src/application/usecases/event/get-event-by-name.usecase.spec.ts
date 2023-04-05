import { GetEventByNameRepositoryInterface } from '@/application/interfaces/event-repository.interface'
import { GetEventByNameUseCaseInterface } from '@/application/interfaces/event-usecase.interface'
import { EventEntity } from '@/domain/entities/event.entity'

const enventRepository: jest.Mocked<GetEventByNameRepositoryInterface> = {
  getByName: jest.fn().mockResolvedValue({
    id: 'anyEventId',
    calendar_id: 'anyCalendarId',
    name: 'Any Event',
    category: 'NORMAL',
    start_date: new Date('2023-01-01 13:00:00'),
    end_date: new Date('2023-01-01 13:00:00')
  })
}

export class GetEventByNameUseCase implements GetEventByNameUseCaseInterface {
  constructor (private readonly enventRepository: GetEventByNameRepositoryInterface) {}
  async execute (name: string): Promise<EventEntity> {
    const calendar = await this.enventRepository.getByName(name)
    return calendar ?? null
  }
}

describe('GetEventByNameUseCase', () => {
  let sut: GetEventByNameUseCase
  beforeAll(() => {
    sut = new GetEventByNameUseCase(enventRepository)
  })
  test('should call EventRepository once and with correct name', async () => {
    await sut.execute('Any Event')

    expect(enventRepository.getByName).toHaveBeenCalledTimes(1)
    expect(enventRepository.getByName).toHaveBeenCalledWith('Any Event')
  })

  test('should return a calendar if exists', async () => {
    const response = await sut.execute('Any Event')

    expect(response).toEqual({
      id: 'anyEventId',
      calendar_id: 'anyCalendarId',
      name: 'Any Event',
      category: 'NORMAL',
      start_date: new Date('2023-01-01 13:00:00'),
      end_date: new Date('2023-01-01 13:00:00')
    })
  })

  test('should return null if calendar does not exists', async () => {
    enventRepository.getByName.mockResolvedValueOnce(null)

    const response = await sut.execute('Invalid Name')

    expect(response).toBeNull()
  })
})
