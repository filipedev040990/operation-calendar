import { GetCalendarByIdUseCaseInterface } from '@/application/interfaces'
import { ControllerInterface } from '@/infra/interfaces/controller.interface'
import { InvalidParamError, MissingParamError } from '@/shared/errors'
import { badRequest } from '@/shared/helpers/http'
import { HttpRequest, HttpResponse } from '@/shared/types/http'

const getCalendarByIdUseCase: jest.Mocked<GetCalendarByIdUseCaseInterface> = {
  execute: jest.fn().mockResolvedValue({
    id: 'anyId',
    name: 'any Name',
    created_at: new Date('2023-01-01 19:56:10')
  })
}

export class SaveEventController implements ControllerInterface {
  constructor (private readonly getCalendarByIdUseCase: GetCalendarByIdUseCaseInterface) {}
  async execute (input: HttpRequest): Promise<HttpResponse> {
    const error = await this.validateInput(input)
    if (error) {
      return error
    }
    return null
  }

  private async validateInput (input: HttpRequest): Promise<HttpResponse | void> {
    const requiredFields = ['calendar_id', 'name', 'category', 'start_date']

    for (const field of requiredFields) {
      if (!input.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }

    const validCategories = ['NORMAL', 'WARNING', 'CRITICAL']

    if (!validCategories.includes(input.body.category)) {
      return badRequest(new InvalidParamError('category'))
    }

    const calendar = await this.getCalendarByIdUseCase.execute(input.body.calendar_id)
    if (!calendar) {
      return badRequest(new InvalidParamError('calendar_id'))
    }
  }
}

describe('SaveEventController', () => {
  let input: HttpRequest
  let sut: SaveEventController

  beforeAll(() => {
    sut = new SaveEventController(getCalendarByIdUseCase)
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
})
