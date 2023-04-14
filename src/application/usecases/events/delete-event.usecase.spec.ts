import { DeleteEventRepositoryInterface } from '@/application/interfaces/event-repository.interface'
import { DeleteEventUseCaseInterface } from '@/application/interfaces/event-usecase.interface'

export class DeleteEventUseCase implements DeleteEventUseCaseInterface {
  constructor (private readonly eventRepository: DeleteEventRepositoryInterface) {}
  async execute (id: string): Promise<void> {
    await this.eventRepository.delete(id)
  }
}

const eventRepository: jest.Mocked<DeleteEventRepositoryInterface> = {
  delete: jest.fn()
}

describe('DeleteEventUseCase', () => {
  let sut: DeleteEventUseCase

  beforeAll(() => {
    sut = new DeleteEventUseCase(eventRepository)
  })

  test('should call EventRepository.delete once and with correct id', async () => {
    await sut.execute('anyEventId')

    expect(eventRepository.delete).toHaveBeenCalledTimes(1)
    expect(eventRepository.delete).toHaveBeenCalledWith('anyEventId')
  })
})
