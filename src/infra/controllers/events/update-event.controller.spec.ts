import { GetCalendarByIdUseCaseInterface } from '@/application/interfaces'
import { GetEventByNameUseCaseInterface } from '@/application/interfaces/event-usecase.interface'
import { ControllerInterface } from '@/infra/interfaces/controller.interface'
import { InvalidParamError, MissingParamError, ResourceConflictError } from '@/shared/errors'
import { badRequest, conflict } from '@/shared/helpers/http'
import { HttpRequest, HttpResponse } from '@/shared/types/http'
import MockDate from 'mockdate'

export class UpdateEventController implements ControllerInterface {
  constructor (
    private readonly getCalendarByIdUseCase: GetCalendarByIdUseCaseInterface,
    private readonly getEventByName: GetEventByNameUseCaseInterface
  ) {}

  async execute (input: HttpRequest): Promise<HttpResponse> {
    const missingParam = this.requiredParamsValidator(input)
    if (missingParam) {
      return badRequest(new MissingParamError(missingParam))
    }

    const invalidCategory = this.categoryValidator(input.body.category)
    if (invalidCategory) {
      return badRequest(new InvalidParamError('category'))
    }

    const calendar = await this.getCalendarByIdUseCase.execute(input.body.calendar_id)
    if (!calendar) {
      return badRequest(new InvalidParamError('calendar_id'))
    }

    const event = await this.getEventByName.execute(input.body.name)
    if (event) {
      return conflict(new ResourceConflictError('This event already exists'))
    }
    return null
  }

  private requiredParamsValidator (input: HttpRequest): string | void {
    const requiredFields = ['id', 'calendar_id', 'name', 'category', 'start_date']
    for (const field of requiredFields) {
      const source = field === 'id' ? 'params' : 'body'

      if (!input[source][field]) {
        return field
      }
    }
  }

  private categoryValidator (category: string): string | void {
    const validCategories = ['NORMAL', 'WARNING', 'CRITICAL']
    if (!validCategories.includes(category)) {
      return category
    }
  }
}

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

describe('UpdateEventController', () => {
  let sut: UpdateEventController
  let input: HttpRequest

  beforeAll(() => {
    MockDate.set(new Date())
    sut = new UpdateEventController(getCalendarByIdUseCase, getEventByName)
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
})
