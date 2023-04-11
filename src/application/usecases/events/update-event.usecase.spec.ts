import { UpdateEventeRepositoryInterface } from '@/application/interfaces/event-repository.interface'
import { UpdateEventUseCaseInterface } from '@/application/interfaces/event-usecase.interface'
import { EventEntity } from '@/domain/entities/event.entity'

const input = {
  id: 'anyId',
  calendar_id: 'anyCalendarId',
  category: 'NORMAL',
  name: 'anyName',
  start_date: new Date('2023-01-01'),
  end_date: new Date('2023-01-03')
}

const eventRepository: jest.Mocked<UpdateEventeRepositoryInterface> = {
  update: jest.fn().mockResolvedValue(input)
}

export class UpdateEventUseCase implements UpdateEventUseCaseInterface {
  constructor (private readonly eventRepository: UpdateEventeRepositoryInterface) {}
  async execute (input: UpdateEventUseCaseInterface.Input): Promise<UpdateEventUseCaseInterface.Output> {
    const endDate = input.end_date ?? input.start_date
    const event = new EventEntity({
      id: input.id,
      calendar_id: input.calendar_id,
      name: input.name,
      category: input.category,
      start_date: new Date(input.start_date),
      end_date: new Date(endDate)
    })
    await this.eventRepository.update(event)
    return null
  }
}

describe('UpdateEventUseCase', () => {
  let sut: UpdateEventUseCase

  beforeAll(() => {
    sut = new UpdateEventUseCase(eventRepository)
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
})
