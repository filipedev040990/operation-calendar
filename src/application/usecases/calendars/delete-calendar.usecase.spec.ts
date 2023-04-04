import { DeleteCalendarRepositoryInterface } from '@/application/interfaces'
import { DeleteCalendarUseCase } from './delete-calendar.usecase'

const calendarRepository: jest.Mocked<DeleteCalendarRepositoryInterface> = {
  delete: jest.fn()
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
