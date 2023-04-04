import { GetCalendarByIdUseCaseInterface } from '@/application/interfaces'
import { ControllerInterface } from '@/infra/interfaces/controller.interface'
import { InvalidParamError, MissingParamError } from '@/shared/errors'
import { badRequest } from '@/shared/helpers/http'
import { HttpRequest, HttpResponse } from '@/shared/types/http'

export class DeleteCalendarController implements ControllerInterface {
  constructor (private readonly getCalendarbyIdUseCase: GetCalendarByIdUseCaseInterface) {}
  async execute (input: HttpRequest): Promise<HttpResponse> {
    const id = input.params?.id

    if (!id) {
      return badRequest(new MissingParamError('id'))
    }

    const calendar = await this.getCalendarbyIdUseCase.execute(id)
    if (!calendar) {
      return badRequest(new InvalidParamError('id'))
    }
    return null
  }
}

const getCalendarbyIdUseCase: jest.Mocked<GetCalendarByIdUseCaseInterface> = {
  execute: jest.fn().mockResolvedValue({
    id: 'anyid',
    name: 'AnyName',
    created_at: new Date('2023-01-01 15:15:15')
  })
}

describe('DeleteCalendarController', () => {
  let sut: DeleteCalendarController
  let input: HttpRequest
  beforeAll(() => {
    sut = new DeleteCalendarController(getCalendarbyIdUseCase)
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

    expect(getCalendarbyIdUseCase.execute).toHaveBeenCalledTimes(1)
    expect(getCalendarbyIdUseCase.execute).toHaveBeenCalledWith('anyId')
  })

  test('should return 400 if id does not exists', async () => {
    getCalendarbyIdUseCase.execute.mockResolvedValueOnce(null)

    const response = await sut.execute(input)

    expect(response).toEqual(badRequest(new InvalidParamError('id')))
  })
})
