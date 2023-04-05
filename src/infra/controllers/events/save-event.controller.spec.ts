import { GetCalendarByIdUseCaseInterface } from '@/application/interfaces'
import { GetEventByNameUseCaseInterface } from '@/application/interfaces/event-usecase.interface'
import { InvalidParamError, MissingParamError, ResourceConflictError } from '@/shared/errors'
import { badRequest, conflict } from '@/shared/helpers/http'
import { HttpRequest } from '@/shared/types/http'
import { SaveEventController } from './save-event.controller'

const getCalendarByIdUseCase: jest.Mocked<GetCalendarByIdUseCaseInterface> = {
  execute: jest.fn().mockResolvedValue({
    id: 'anyId',
    name: 'any Name',
    created_at: new Date('2023-01-01 19:56:10')
  })
}

const getEventCalendarByName: jest.Mocked<GetEventByNameUseCaseInterface> = {
  execute: jest.fn().mockResolvedValue(null)
}

describe('SaveEventController', () => {
  let input: HttpRequest
  let sut: SaveEventController

  beforeAll(() => {
    sut = new SaveEventController(getCalendarByIdUseCase, getEventCalendarByName)
  })
  beforeEach(() => {
    jest.clearAllMocks()
    input = {
      body: {
        calendar_id: 'AnyCalendarId',
        name: 'AnyEventName',
        category: 'NORMAL',
        start_date: new Date()
      }
    }
  })
  test('should return 400 if any required field is not provided', async () => {
    const requiredFields = ['calendar_id', 'name', 'category', 'start_date']

    for (const field of requiredFields) {
      const fieldValue = field

      input.body[field] = null

      const response = await sut.execute(input)

      expect(response).toEqual(badRequest(new MissingParamError(field)))

      input.body[field] = fieldValue
    }
  })

  test('should return 400 if invalid category is provided', async () => {
    input.body.category = 'InvalidCategory'

    const response = await sut.execute(input)

    expect(response).toEqual(badRequest(new InvalidParamError('category')))
  })

  test('should call GetCalendarByIdUseCase once and with correct calendar_id', async () => {
    await sut.execute(input)

    expect(getCalendarByIdUseCase.execute).toHaveBeenCalledTimes(1)
    expect(getCalendarByIdUseCase.execute).toHaveBeenCalledWith('AnyCalendarId')
  })

  test('should return 400 if GetCalendarByIdUseCase returns null', async () => {
    getCalendarByIdUseCase.execute.mockResolvedValueOnce(null)

    const response = await sut.execute(input)

    expect(response).toEqual(badRequest(new InvalidParamError('calendar_id')))
  })

  test('should call GetEventCalendarByName once and with correct name', async () => {
    await sut.execute(input)

    expect(getEventCalendarByName.execute).toHaveBeenCalledTimes(1)
    expect(getEventCalendarByName.execute).toHaveBeenCalledWith('AnyEventName')
  })

  test('should return 409 if already event', async () => {
    getEventCalendarByName.execute.mockResolvedValueOnce({
      id: 'anyId',
      calendar_id: 'anyCalendarId',
      name: 'AnyEventName',
      category: 'NORMAL',
      start_date: new Date('2023-01-01'),
      end_date: new Date('2023-01-01')
    })
    const response = await sut.execute(input)

    expect(response).toEqual(conflict(new ResourceConflictError('This event already exists')))
  })

  test('should return 400 if end date is provided and it is less than start date', async () => {
    const now = new Date()
    const yesterday = now.setDate(now.getDate() - 1)
    input.body.end_date = yesterday

    const response = await sut.execute(input)

    expect(response).toEqual(badRequest(new InvalidParamError('end_date')))
  })
})
