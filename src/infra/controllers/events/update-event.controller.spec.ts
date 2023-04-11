import { GetCalendarByIdUseCaseInterface } from '@/application/interfaces'
import { GetEventByNameUseCaseInterface, UpdateEventUseCaseInterface } from '@/application/interfaces/event-usecase.interface'
import { ControllerInterface } from '@/infra/interfaces/controller.interface'
import { InvalidParamError, MissingParamError, ResourceConflictError } from '@/shared/errors'
import { badRequest, conflict, serverError, success } from '@/shared/helpers/http'
import { HttpRequest, HttpResponse } from '@/shared/types/http'
import MockDate from 'mockdate'

export class UpdateEventController implements ControllerInterface {
  constructor (
    private readonly getCalendarByIdUseCase: GetCalendarByIdUseCaseInterface,
    private readonly getEventByName: GetEventByNameUseCaseInterface,
    private readonly updateEventUseCase: UpdateEventUseCaseInterface
  ) {}

  async execute (input: HttpRequest): Promise<HttpResponse> {
    try {
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
      if (event && event.id !== input.params.id) {
        return conflict(new ResourceConflictError('This event already exists'))
      }

      const invalidEndDate = this.endDateValidator(input)
      if (invalidEndDate) {
        return badRequest(new InvalidParamError('end_date'))
      }

      const newEvent = await this.updateEventUseCase.execute({
        id: input.params.id,
        calendar_id: input.body.calendar_id,
        name: input.body.name,
        category: input.body.category,
        start_date: input.body.start_date,
        end_date: input.body.end_date ?? input.body.start_date
      })
      return success(201, newEvent)
    } catch (error) {
      return serverError(error)
    }
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

  private endDateValidator (input: HttpRequest): Date | void {
    if (input.body?.end_date < input.body.start_date) {
      return input.body.end_date
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
    sut = new UpdateEventController(getCalendarByIdUseCase, getEventByName, updateEventUseCase)
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
      statusCode: 201,
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
