import { MissingParamError } from '@/shared/errors'
import { badRequest, noContent, serverError } from '@/shared/helpers/http'
import { DeleteEventController } from './delete-event.controller'
import { HttpRequest } from '@/shared/types/http'
import { DeleteEventUseCaseInterface, GetEventByIdUseCaseInterface } from '@/application/interfaces/event-usecase.interface'

const deleteEventUseCase: jest.Mocked<DeleteEventUseCaseInterface> = {
  execute: jest.fn()
}

const getEventByIdUseCase: jest.Mocked<GetEventByIdUseCaseInterface> = {
  execute: jest.fn().mockResolvedValue({
    id: 'anyId',
    calendar_id: 'anyCalendarId',
    category: 'NORMAL',
    name: 'anyName',
    start_date: new Date('2023-01-01'),
    end_date: new Date('2023-01-03')
  })
}

describe('DeleteEventController', () => {
  let sut: DeleteEventController
  let input: HttpRequest

  beforeAll(() => {
    sut = new DeleteEventController(getEventByIdUseCase, deleteEventUseCase)
  })

  beforeEach(() => {
    jest.clearAllMocks()
    input = {
      params: {
        id: 'anyEventId'
      }
    }
  })
  test('should return 400 if id is not provided', async () => {
    input.params = null

    const response = await sut.execute(input)

    expect(response).toEqual(badRequest(new MissingParamError('id')))
  })

  test('should call GetEventByIdUseCase once and with correct id', async () => {
    await sut.execute(input)

    expect(getEventByIdUseCase.execute).toHaveBeenCalledTimes(1)
    expect(getEventByIdUseCase.execute).toHaveBeenCalledWith('anyEventId')
  })

  test('should call DeleteEventUseCase once and with correct id', async () => {
    await sut.execute(input)

    expect(deleteEventUseCase.execute).toHaveBeenCalledTimes(1)
    expect(deleteEventUseCase.execute).toHaveBeenCalledWith('anyEventId')
  })
  test('should return 204 on sucess', async () => {
    const response = await sut.execute(input)

    expect(response).toEqual(noContent())
  })

  test('should throw if DeleteEventUseCase throws', async () => {
    deleteEventUseCase.execute.mockImplementationOnce(() => {
      throw new Error()
    })

    const response = await sut.execute(input)

    expect(response).toEqual(serverError(new Error()))
  })
})
