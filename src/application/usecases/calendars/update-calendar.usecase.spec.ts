import { UpdateCalendarRepositoryInterface } from '@/application/interfaces'
import { UpdateCalendarUseCaseInterface } from '@/application/interfaces/update-calendar-usecase.interface'
import MockDate from 'mockdate'

const calendarRepository: jest.Mocked<UpdateCalendarRepositoryInterface> = {
  update: jest.fn().mockResolvedValue({
    id: '123456789',
    name: 'Updated Name',
    created_at: new Date('2022-12-31 16:15:12')
  })
}

const input: UpdateCalendarUseCaseInterface.Input = {
  id: '123456789',
  name: 'Updated Name'
}

export class UpdateCalendarUseCase implements UpdateCalendarUseCaseInterface {
  constructor (private readonly calendarRepository: UpdateCalendarRepositoryInterface) {}
  async execute (input: UpdateCalendarUseCaseInterface.Input): Promise<UpdateCalendarUseCaseInterface.Output> {
    const calendarUpdated = await this.calendarRepository.update({
      id: input.id,
      name: input.name
    })
    return calendarUpdated
  }
}

describe('UpdateCalendarUseCase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })
  afterAll(() => {
    MockDate.reset()
  })
  test('should call CalendarRepository.update once and with correct values', async () => {
    const sut = new UpdateCalendarUseCase(calendarRepository)

    await sut.execute(input)

    expect(calendarRepository.update).toHaveBeenCalledTimes(1)
    expect(calendarRepository.update).toHaveBeenCalledWith({ id: '123456789', name: 'Updated Name' })
  })

  test('should return a calendar updated', async () => {
    const sut = new UpdateCalendarUseCase(calendarRepository)

    const response = await sut.execute(input)

    expect(response).toEqual({ id: '123456789', name: 'Updated Name', created_at: new Date('2022-12-31 16:15:12') })
  })
})
