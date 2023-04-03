import { MissingParamError, ResourceConflictError } from '@/shared/errors'
import { badRequest, conflict, serverError } from '@/shared/helpers/http'
import { HttpRequest } from '@/shared/types/http'
import { GetCalendarByIdUseCaseInterface, GetCalendarByNameUseCaseInterface, UpdateCalendarUseCaseInterface } from '@/application/interfaces'
import { UpdateCalendarController } from './update-calendar.controller'

const getCalendarByNameUseCase: jest.Mocked<GetCalendarByNameUseCaseInterface> = {
  execute: jest.fn()
}

const updateCalendarUseCase: jest.Mocked<UpdateCalendarUseCaseInterface> = {
  execute: jest.fn().mockResolvedValue({
    id: '123456789',
    name: 'Updated Name',
    created_at: new Date('2023-01-01')
  })
}

const getCalendarByIdUseCase: jest.Mocked<GetCalendarByIdUseCaseInterface> = {
  execute: jest.fn().mockResolvedValueOnce({
    id: '123456789',
    name: 'Any Name',
    created_at: new Date('2023-01-01')
  })
}

describe('UpdateCalendarController', () => {
  let sut: UpdateCalendarController
  let input: HttpRequest

  beforeAll(() => {
    sut = new UpdateCalendarController(getCalendarByNameUseCase, updateCalendarUseCase, getCalendarByIdUseCase)
  })

  beforeEach(() => {
    jest.clearAllMocks()
    input = {
      params: {
        id: '123456789'
      },
      body: {
        name: 'Updated Name'
      }
    }
  })

  test('should return 400 if calendar id is not provided', async () => {
    input.params.id = null
    const response = await sut.execute(input)

    expect(response).toEqual(badRequest(new MissingParamError('id')))
  })

  test('should return 400 if name is not provided', async () => {
    input.body.name = null
    const response = await sut.execute(input)

    expect(response).toEqual(badRequest(new MissingParamError('name')))
  })

  test('should call GetCalendarByIdUseCase once and with correct id', async () => {
    await sut.execute(input)

    expect(getCalendarByIdUseCase.execute).toHaveBeenCalledTimes(1)
    expect(getCalendarByIdUseCase.execute).toHaveBeenCalledWith('123456789')
  })

  test('should call GetCalendarByNameUseCase once and with correct name', async () => {
    await sut.execute(input)

    expect(getCalendarByNameUseCase.execute).toHaveBeenCalledTimes(1)
    expect(getCalendarByNameUseCase.execute).toHaveBeenCalledWith('Updated Name')
  })

  test('should return 409 if name already exists', async () => {
    getCalendarByNameUseCase.execute.mockResolvedValueOnce({
      id: '9999999',
      name: 'Updated Name',
      created_at: new Date('2023-01-01')
    })
    const response = await sut.execute(input)

    expect(response).toEqual(conflict(new ResourceConflictError('This name already exists')))
  })

  test('should call UpdateCalendarUseCase once and with correct values', async () => {
    await sut.execute(input)

    expect(updateCalendarUseCase.execute).toHaveBeenCalledTimes(1)
    expect(updateCalendarUseCase.execute).toHaveBeenCalledWith({ id: input.params.id, name: input.body.name })
  })

  test('should return a calendar updated', async () => {
    const response = await sut.execute(input)

    expect(response).toEqual({
      statusCode: 200,
      body: {
        id: '123456789',
        name: 'Updated Name',
        created_at: new Date('2023-01-01')
      }
    })
  })

  test('should throw if UpdateCalendarUseCase throws', async () => {
    updateCalendarUseCase.execute.mockImplementationOnce(() => {
      throw new Error()
    })
    const response = await sut.execute(input)

    expect(response).toEqual(serverError(new Error()))
  })
})
