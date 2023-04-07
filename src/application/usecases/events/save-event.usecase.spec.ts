import { SaveEventeRepositoryInterface } from '@/application/interfaces/event-repository.interface'
import { SaveEvent } from '@/application/interfaces/event-usecase.interface'
import MockDate from 'mockdate'
import { SaveEventUseCase } from './save-event.usecase'
import { UUIDGeneratorInterface } from '@/application/interfaces'

const eventRepository: jest.Mocked<SaveEventeRepositoryInterface> = {
  save: jest.fn().mockResolvedValue({
    id: 'anyId',
    calendar: {
      id: 'anyCalendarId',
      name: 'AnyCalendar',
      created_at: new Date('2023-01-01')
    },
    category: 'NORMAL',
    name: 'anyName',
    start_date: new Date('2023-01-01'),
    end_date: new Date('2023-01-03')
  })
}

const uuidGenerator: jest.Mocked<UUIDGeneratorInterface> = {
  uuid: jest.fn().mockReturnValue('anyId')
}

describe('SaveEventUseCase', () => {
  let input: SaveEvent.Input
  let sut: SaveEventUseCase

  beforeAll(() => {
    sut = new SaveEventUseCase(eventRepository, uuidGenerator)
    MockDate.set(new Date('2023-01-01'))
  })

  beforeEach(() => {
    jest.clearAllMocks()
    input = {
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

  test('should return a new Event', async () => {
    const response = await sut.execute(input)

    expect(response).toEqual({
      id: 'anyId',
      calendar: {
        id: 'anyCalendarId',
        name: 'AnyCalendar',
        created_at: new Date('2023-01-01')
      },
      category: 'NORMAL',
      name: 'anyName',
      start_date: new Date('2023-01-01'),
      end_date: new Date('2023-01-03')
    })
  })
})
