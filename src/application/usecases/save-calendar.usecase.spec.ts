import { SaveCalendarUseCase } from './save-calendar.usecase'
import { SaveCalendarRepository } from '@/application/contracts/calendar-repository.interface'
import { UUIDGenerator } from '../contracts/uuid-generator.interface'

const calendarRepository: jest.Mocked<SaveCalendarRepository> = {
  save: jest.fn()
}

const uuidGenerator: jest.Mocked<UUIDGenerator> = {
  uuid: jest.fn().mockReturnValue('1bead43e-5c18-40ee-839c-0013dc700220')
}

describe('SaveCalendarUseCase', () => {
  test('should call UUIDGenerator.uuid once', async () => {
    const sut = new SaveCalendarUseCase(calendarRepository, uuidGenerator)

    await sut.execute({ name: 'Zé das Couves' })

    expect(uuidGenerator.uuid).toHaveBeenCalledTimes(1)
  })
})
