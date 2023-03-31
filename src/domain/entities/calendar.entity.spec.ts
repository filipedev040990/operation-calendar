import MockDate from 'mockdate'

export class CalendarEntity {
  public readonly id: string
  public readonly name: string
  public readonly created_at: Date

  constructor (input: CalendarEntity.Input) {
    Object.assign(this, input)
  }
}

export namespace CalendarEntity {
  export type Input = {
    id: string
    name: string
    created_at: Date
  }
}

describe('CalendarEntity', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })
  afterAll(() => {
    MockDate.reset()
  })
  test('should create an instance of CalendarEntity correctly', () => {
    const calendar = new CalendarEntity({
      id: '123456',
      name: 'Test',
      created_at: new Date()
    })

    expect(calendar.id).toBe('123456')
    expect(calendar.name).toBe('Test')
    expect(calendar.created_at).toEqual(new Date())
  })
})
