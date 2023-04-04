import { SaveEventeRepositoryInterface } from '@/application/interfaces/event-repository.interface'
import { SaveEvent } from '@/application/interfaces/event-usecase.interface'
import MockDate from 'mockdate'
import { SaveEventUseCase } from './save-event.usecase'

export const eventRepository: jest.Mocked<SaveEventeRepositoryInterface> = {
  save: jest.fn()
}

describe('SaveEventUseCase', () => {
  let input: SaveEvent.Input
  let sut: SaveEventUseCase

  beforeAll(() => {
    sut = new SaveEventUseCase(eventRepository)
    MockDate.set(new Date('2023-01-01'))
  })

  beforeEach(() => {
    jest.clearAllMocks()
    input = {
      id: 'anyId',
      calendar_id: 'anyCalendarId',
      category: 'NORMAL',
      name: 'anyName',
      start_date: new Date('2023-01-01'),
      end_date: new Date('2023-01-03')
    }
  })
  afterAll(() => {
    MockDate.reset()
  })

  test('should call EventRepository.save once and with correct values', async () => {
    await sut.execute(input)

    expect(eventRepository.save).toHaveBeenCalledTimes(1)
    expect(eventRepository.save).toHaveBeenCalledWith({
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

    expect(eventRepository.save).toHaveBeenCalledTimes(1)
    expect(eventRepository.save).toHaveBeenCalledWith({
      id: 'anyId',
      calendar_id: 'anyCalendarId',
      category: 'NORMAL',
      name: 'anyName',
      start_date: new Date('2023-01-01'),
      end_date: new Date('2023-01-01')
    })
  })
})
