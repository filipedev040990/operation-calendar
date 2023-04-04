import { DeleteCalendarRepositoryInterface, DeleteCalendarUseCaseInterface } from '@/application/interfaces'

const calendarRepository: jest.Mocked<DeleteCalendarRepositoryInterface> = {
  delete: jest.fn()
}

export class DeleteCalendarUseCase implements DeleteCalendarUseCaseInterface {
  constructor (private readonly calendarRepository: DeleteCalendarRepositoryInterface) {}
  async execute (id: string): Promise<void> {
    await this.calendarRepository.delete(id)
  }
}

describe('DeleteCalendarUseCase', () => {
  let sut: DeleteCalendarUseCase

  beforeAll(() => {
    sut = new DeleteCalendarUseCase(calendarRepository)
  })
  test('should call CalendarRepository.delete once and with correct id', async () => {
    await sut.execute('anyId')

    expect(calendarRepository.delete).toHaveBeenCalledTimes(1)
    expect(calendarRepository.delete).toHaveBeenCalledWith('anyId')
  })
  test('should rethrow if CalendarRepository.delete throws', async () => {
    calendarRepository.delete.mockImplementationOnce(() => {
      throw new Error()
    })

    const promise = sut.execute('anyId')

    await expect(promise).rejects.toThrowError()
  })
})
