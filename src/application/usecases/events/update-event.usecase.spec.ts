import { UpdateEventeRepositoryInterface } from '@/application/interfaces/event-repository.interface'
import { UpdateEventUseCaseInterface } from '@/application/interfaces/event-usecase.interface'
import { UpdateEventUseCase } from './update-event.usecase'

const eventRepository: jest.Mocked<UpdateEventeRepositoryInterface> = {
  update: jest.fn().mockResolvedValue({
    id: 'anyId',
    calendar_id: 'anyCalendarId',
    category: 'NORMAL',
    name: 'anyName',
    start_date: new Date('2023-01-01'),
    end_date: new Date('2023-01-03')
  })
}

describe('UpdateEventUseCase', () => {
  let sut: UpdateEventUseCase
  let input: UpdateEventUseCaseInterface.Input

  beforeAll(() => {
    sut = new UpdateEventUseCase(eventRepository)
    input = {
      id: 'anyId',
      calendar_id: 'anyCalendarId',
      category: 'NORMAL',
      name: 'anyName',
      start_date: new Date('2023-01-01'),
      end_date: new Date('2023-01-03')
    }
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should call EventRepository.update once and with correct values', async () => {
    await sut.execute(input)

    expect(eventRepository.update).toHaveBeenCalledTimes(1)
    expect(eventRepository.update).toHaveBeenCalledWith({
      id: 'anyId',
      calendar_id: 'anyCalendarId',
      category: 'NORMAL',
      name: 'anyName',
      start_date: new Date('2023-01-01'),
      end_date: new Date('2023-01-03')
    })
  })

  test('should set start_date to end_date if null', async () => {
    input.end_date = null

    await sut.execute(input)

    expect(eventRepository.update).toHaveBeenCalledTimes(1)
    expect(eventRepository.update).toHaveBeenCalledWith({
      id: 'anyId',
      calendar_id: 'anyCalendarId',
      category: 'NORMAL',
      name: 'anyName',
      start_date: new Date('2023-01-01'),
      end_date: new Date('2023-01-01')
    })
  })

  test('should return a updated Event', async () => {
    const response = await sut.execute(input)

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
