import MockDate from 'mockdate'

export class EventEntity {
  public id: string
  public calendar_id: string
  public name: string
  public category: string
  public start_date: Date
  public end_date: Date

  constructor (input: EventEntity.Input) {
    Object.assign(this, input)
  }
}

export namespace EventEntity {
  export type Input = {
    id: string
    calendar_id: string
    name: string
    category: string
    start_date: Date
    end_date: Date
  }
}

describe('EventEntity', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })
  afterAll(() => {
    MockDate.reset()
  })
  test('should create an instance of EventEntity correctly', () => {
    const event = new EventEntity({
      id: '987654321013',
      calendar_id: '123456',
      name: 'Event Test',
      category: 'NORMAL',
      start_date: new Date(),
      end_date: new Date()
    })

    expect(event.id).toBe('987654321013')
    expect(event.calendar_id).toBe('123456')
    expect(event.name).toBe('Event Test')
    expect(event.category).toBe('NORMAL')
    expect(event.start_date).toEqual(new Date())
    expect(event.end_date).toEqual(new Date())
  })
})
