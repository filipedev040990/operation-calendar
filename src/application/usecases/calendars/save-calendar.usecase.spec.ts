import { SaveCalendarUseCase } from './save-calendar.usecase'
import { SaveCalendarRepositoryInterface } from '@/application/interfaces'
import { UUIDGeneratorInterface } from '@/application/interfaces/uuid-generator.interface'
import MockDate from 'mockdate'

const input = {
  id: '1bead43e-5c18-40ee-839c-0013dc700220',
  name: 'Zé das Couves',
  created_at: new Date('2023-01-01')
}

const calendarRepository: jest.Mocked<SaveCalendarRepositoryInterface> = {
  save: jest.fn().mockResolvedValue(input)
}

const uuidGenerator: jest.Mocked<UUIDGeneratorInterface> = {
  uuid: jest.fn().mockReturnValue('1bead43e-5c18-40ee-839c-0013dc700220')
}

describe('SaveCalendarUseCase', () => {
  let sut: SaveCalendarUseCase
  beforeEach(() => {
    jest.clearAllMocks()
  })
  beforeAll(() => {
    sut = new SaveCalendarUseCase(calendarRepository, uuidGenerator)
    MockDate.set(new Date('2023-01-01'))
  })
  afterAll(() => {
    MockDate.reset()
  })
  test('should call UUIDGeneratorInterface.uuid once', async () => {
    await sut.execute({ name: 'Zé das Couves' })

    expect(uuidGenerator.uuid).toHaveBeenCalledTimes(1)
  })

  test('should call CalendarRepository.save once and with correct values', async () => {
    await sut.execute({ name: 'Zé das Couves' })

    expect(calendarRepository.save).toHaveBeenCalledTimes(1)
    expect(calendarRepository.save).toHaveBeenCalledWith(input)
  })

  test('should return an calendar', async () => {
    const calendar = await sut.execute({ name: 'Zé das Couves' })

    expect(calendar).toEqual(input)
  })
})
