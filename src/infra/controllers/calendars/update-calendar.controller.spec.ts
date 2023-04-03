import { MissingParamError, ResourceConflictError } from '@/shared/errors'
import { badRequest, conflict } from '@/shared/helpers/http'
import { HttpRequest, HttpResponse } from '@/shared/types/http'
import { ControllerInterface } from '@/infra/interfaces/controller.interface'
import { GetCalendarByNameUseCaseInterface } from '@/application/interfaces/get-calendar-by-name-usecase.interface'

export class UpdateCalendarController implements ControllerInterface {
  constructor (private readonly getCalendarByNameUseCase: GetCalendarByNameUseCaseInterface) {}
  async execute (input: HttpRequest): Promise<HttpResponse> {
    const error = this.validateInput(input)
    if (error) {
      return await error
    }

    return null
  }

  private async validateInput (input: HttpRequest): Promise<HttpResponse | null> {
    if (!input.params?.id) {
      return badRequest(new MissingParamError('id'))
    }

    if (!input.body?.name) {
      return badRequest(new MissingParamError('name'))
    }

    const nameExists = await this.getCalendarByNameUseCase.execute(input.body.name)
    if (nameExists && nameExists.id !== input.params.id) {
      return conflict(new ResourceConflictError('This name already exists'))
    }
  }
}

const getCalendarByNameUseCase: jest.Mocked<GetCalendarByNameUseCaseInterface> = {
  execute: jest.fn()
}

describe('UpdateCalendarController', () => {
  let sut: UpdateCalendarController
  let input: HttpRequest

  beforeAll(() => {
    sut = new UpdateCalendarController(getCalendarByNameUseCase)
  })

  beforeEach(() => {
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
})
