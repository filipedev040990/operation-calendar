import { EventEntity } from './event.entity'
import MockDate from 'mockdate'

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
