import { SaveEventeRepositoryInterface } from '@/application/interfaces/event-repository.interface'
import { SaveEvent, SaveEventUseCaseInterface } from '@/application/interfaces/event-usecase.interface'
import { EventEntity } from '@/domain/entities/event.entity'
import MockDate from 'mockdate'

export class SaveEventUseCase implements SaveEventUseCaseInterface {
  constructor (private readonly eventRepository: SaveEventeRepositoryInterface) {}
  async execute (input: SaveEvent.Input): Promise<SaveEvent.Output> {
    const event = new EventEntity({
      id: input.id,
      calendar_id: input.calendar_id,
      name: input.name,
      category: input.category,
      start_date: input.start_date,
      end_date: input.end_date ?? input.start_date
    })

    await this.eventRepository.save(event)
    return null
  }
}

export const eventRepository: jest.Mocked<SaveEventeRepositoryInterface> = {
  save: jest.fn()
}

describe('SaveEventUseCase', () => {
  let input: SaveEvent.Input
  beforeAll(() => {
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
    const sut = new SaveEventUseCase(eventRepository)

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
    const sut = new SaveEventUseCase(eventRepository)

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
