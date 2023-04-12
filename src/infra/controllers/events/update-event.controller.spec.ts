import { GetCalendarByIdUseCaseInterface } from '@/application/interfaces'
import { GetEventByIdUseCaseInterface, GetEventByNameUseCaseInterface, UpdateEventUseCaseInterface } from '@/application/interfaces/event-usecase.interface'
import { InvalidParamError, MissingParamError, ResourceConflictError } from '@/shared/errors'
import { badRequest, conflict, serverError } from '@/shared/helpers/http'
import { HttpRequest } from '@/shared/types/http'
import MockDate from 'mockdate'
import { UpdateEventController } from './update-event.controller'

const getCalendarByIdUseCase: jest.Mocked<GetCalendarByIdUseCaseInterface> = {
  execute: jest.fn().mockResolvedValue({
    id: 'anyId',
    name: 'any Name',
    created_at: new Date('2023-01-01 19:56:10')
  })
}

const getEventByName: jest.Mocked<GetEventByNameUseCaseInterface> = {
  execute: jest.fn().mockResolvedValue(null)
}

const getEventById: jest.Mocked<GetEventByIdUseCaseInterface> = {
  execute: jest.fn().mockResolvedValue({
    id: 'anyId',
    calendar_id: 'anyCalendarId',
    category: 'NORMAL',
    name: 'anyName',
    start_date: new Date('2023-01-01'),
    end_date: new Date('2023-01-03')
  })
}

const updateEventUseCase: jest.Mocked<UpdateEventUseCaseInterface> = {
  execute: jest.fn().mockResolvedValue({
    id: 'anyId',
    calendar_id: 'anyCalendarId',
    category: 'NORMAL',
    name: 'anyName',
    start_date: new Date('2023-01-01'),
    end_date: new Date('2023-01-03')
  })
}

describe('UpdateEventController', () => {
  let sut: UpdateEventController
  let input: HttpRequest

  beforeAll(() => {
    MockDate.set(new Date())
    sut = new UpdateEventController(getCalendarByIdUseCase, getEventByName, getEventById, updateEventUseCase)
  })

  beforeEach(() => {
    jest.clearAllMocks()
    input = {
      params: {
        id: 'anyId'
      },
      body: {
        calendar_id: 'AnyCalendarId',
        name: 'AnyEventName',
        category: 'NORMAL',
        start_date: new Date()
      }
    }
  })
  test('should return 400 if any required field is not provided', async () => {
    const requiredFields = ['id', 'calendar_id', 'name', 'category', 'start_date']

    for (const field of requiredFields) {
      const fieldValue = field

      if (field === 'id') {
        input.params[field] = null
      } else {
        input.body[field] = null
      }

      const response = await sut.execute(input)

      expect(response).toEqual(badRequest(new MissingParamError(field)))

      if (field === 'id') {
        input.params[field] = fieldValue
      } else {
        input.body[field] = fieldValue
      }
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

  test('should call getEventByName once and with correct name', async () => {
    await sut.execute(input)

    expect(getEventByName.execute).toHaveBeenCalledTimes(1)
    expect(getEventByName.execute).toHaveBeenCalledWith('AnyEventName')
  })

  test('should call getEventById once and with correct id', async () => {
    await sut.execute(input)

    expect(getEventById.execute).toHaveBeenCalledTimes(1)
    expect(getEventById.execute).toHaveBeenCalledWith('anyId')
  })

  test('should return 400 if event id is invalid', async () => {
    getEventById.execute.mockResolvedValueOnce(null)

    const response = await sut.execute(input)

    expect(response).toEqual(badRequest(new InvalidParamError('id')))
  })

  test('should return 409 if already event', async () => {
    getEventByName.execute.mockResolvedValueOnce({
      id: 'anotherId',
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

  test('should call UpdateEventUseCase once and with correct values', async () => {
    await sut.execute(input)

    expect(updateEventUseCase.execute).toHaveBeenCalledTimes(1)
    expect(updateEventUseCase.execute).toHaveBeenCalledWith({
      id: 'anyId',
      calendar_id: 'AnyCalendarId',
      name: 'AnyEventName',
      category: 'NORMAL',
      start_date: new Date(),
      end_date: new Date()

    })
  })

  test('should return a new Event', async () => {
    const response = await sut.execute(input)

    expect(response).toEqual({
      statusCode: 200,
      body: {
        id: 'anyId',
        calendar_id: 'anyCalendarId',
        category: 'NORMAL',
        name: 'anyName',
        start_date: new Date('2023-01-01'),
        end_date: new Date('2023-01-03')
      }
    })
  })

  test('should throw if updateEventUseCase throws', async () => {
    updateEventUseCase.execute.mockImplementationOnce(() => {
      throw new Error()
    })

    const response = await sut.execute(input)

    expect(response).toEqual(serverError(new Error()))
  })
})
