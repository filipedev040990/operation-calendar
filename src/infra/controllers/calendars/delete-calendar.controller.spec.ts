import { DeleteCalendarUseCaseInterface, GetCalendarByIdUseCaseInterface } from '@/application/interfaces'
import { ControllerInterface } from '@/infra/interfaces/controller.interface'
import { InvalidParamError, MissingParamError } from '@/shared/errors'
import { badRequest, noContent, serverError } from '@/shared/helpers/http'
import { HttpRequest, HttpResponse } from '@/shared/types/http'

export class DeleteCalendarController implements ControllerInterface {
  constructor (
    private readonly getCalendarByIdUseCase: GetCalendarByIdUseCaseInterface,
    private readonly deleteCalendarUseCase: DeleteCalendarUseCaseInterface
  ) {}

  async execute (input: HttpRequest): Promise<HttpResponse> {
    try {
      const id = input.params?.id

      if (!id) {
        return badRequest(new MissingParamError('id'))
      }

      const calendar = await this.getCalendarByIdUseCase.execute(id)
      if (!calendar) {
        return badRequest(new InvalidParamError('id'))
      }

      await this.deleteCalendarUseCase.execute(id)

      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

const getCalendarByIdUseCase: jest.Mocked<GetCalendarByIdUseCaseInterface> = {
  execute: jest.fn().mockResolvedValue({
    id: 'anyid',
    name: 'AnyName',
    created_at: new Date('2023-01-01 15:15:15')
  })
}

const deleteCalendarUseCase: jest.Mocked<DeleteCalendarUseCaseInterface> = {
  execute: jest.fn()
}

describe('DeleteCalendarController', () => {
  let sut: DeleteCalendarController
  let input: HttpRequest
  beforeAll(() => {
    sut = new DeleteCalendarController(getCalendarByIdUseCase, deleteCalendarUseCase)
  })

  beforeEach(() => {
    jest.clearAllMocks()
    input = {
      params: {
        id: 'anyId'
      }
    }
  })

  test('should return 400 if id is not provided', async () => {
    input.params.id = null

    const response = await sut.execute(input)

    expect(response).toEqual(badRequest(new MissingParamError('id')))
  })

  test('should call GetCalendarByIdUseCase once and with correct id', async () => {
    await sut.execute(input)

    expect(getCalendarByIdUseCase.execute).toHaveBeenCalledTimes(1)
    expect(getCalendarByIdUseCase.execute).toHaveBeenCalledWith('anyId')
  })

  test('should return 400 if id does not exists', async () => {
    getCalendarByIdUseCase.execute.mockResolvedValueOnce(null)

    const response = await sut.execute(input)

    expect(response).toEqual(badRequest(new InvalidParamError('id')))
  })

  test('should call DeleteCalendrUseCase once and with correct id', async () => {
    await sut.execute(input)

    expect(deleteCalendarUseCase.execute).toHaveBeenCalledTimes(1)
    expect(deleteCalendarUseCase.execute).toHaveBeenCalledWith('anyId')
  })

  test('should return 204', async () => {
    const response = await sut.execute(input)

    expect(response).toEqual(noContent())
  })

  test('should throw if DeleteCalendrUseCase throws', async () => {
    deleteCalendarUseCase.execute.mockImplementationOnce(() => {
      throw new Error()
    })

    const response = await sut.execute(input)

    expect(response).toEqual(serverError(new Error()))
  })

  test('should throw if GetCalendarByIdUseCase throws', async () => {
    getCalendarByIdUseCase.execute.mockImplementationOnce(() => {
      throw new Error()
    })

    const response = await sut.execute(input)

    expect(response).toEqual(serverError(new Error()))
  })
})
