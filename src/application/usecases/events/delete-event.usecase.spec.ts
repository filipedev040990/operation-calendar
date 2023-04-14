import { DeleteEventRepositoryInterface } from '@/application/interfaces/event-repository.interface'
import { DeleteEventUseCase } from './delete-event.usecase'

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

  test('should rethrow if EventRepository.delete throws', async () => {
    eventRepository.delete.mockImplementationOnce(() => {
      throw new Error()
    })

    const promise = sut.execute('anyEventId')

    await expect(promise).rejects.toThrowError()
  })
})
