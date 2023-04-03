import { UpdateCalendarRepositoryInterface, UpdateCalendarUseCaseInterface } from '@/application/interfaces'
import { UpdateCalendarUseCase } from './update-calendar.usecase'
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
