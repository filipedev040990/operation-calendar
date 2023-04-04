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
  test('should call CalendarRepository.delete once and with correct id', async () => {
    const sut = new DeleteCalendarUseCase(calendarRepository)

    await sut.execute('anyId')

    expect(calendarRepository.delete).toHaveBeenCalledTimes(1)
    expect(calendarRepository.delete).toHaveBeenCalledWith('anyId')
  })
})
