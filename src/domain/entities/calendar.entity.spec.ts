import { CalendarEntity } from './calendar.entity'
import MockDate from 'mockdate'

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
