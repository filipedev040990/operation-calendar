import { GetEventByIdRepositoryInterface } from '@/application/interfaces/event-repository.interface'
import { GetEventByIdUseCaseInterface } from '@/application/interfaces/event-usecase.interface'
import { EventEntity } from '@/domain/entities/event.entity'

export class GetEventByIdUseCase implements GetEventByIdUseCaseInterface {
  constructor (private readonly eventRepository: GetEventByIdRepositoryInterface) {}
  async execute (id: string): Promise<EventEntity | null> {
    await this.eventRepository.getById(id)
    return null
  }
}

const eventRepository: jest.Mocked<GetEventByIdRepositoryInterface> = {
  getById: jest.fn()
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
})
