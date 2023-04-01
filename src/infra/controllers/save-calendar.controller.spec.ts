import { GetCalendarByNameUseCaseInterface } from '@/application/interfaces/get-calendar-by-name-usecase.interface'
import { MissingParamError, ResourceConflictError } from '@/shared/errors'
import { badRequest, conflict } from '@/shared/helpers/http'
import { HttpResponse } from '@/shared/types/http'

export class SaveCalendarController {
  constructor (private readonly getCalendarByNameUseCase: GetCalendarByNameUseCaseInterface) {}
  async execute (name: string): Promise<HttpResponse> {
    if (!name) {
      return badRequest(new MissingParamError('name'))
    }

    const calendarExists = await this.getCalendarByNameUseCase.execute(name)
    if (calendarExists) {
      return conflict(new ResourceConflictError('This name already exists'))
    }
    return null
  }
}

describe('SaveCalendarController', () => {
  let input: any

  const getCalendarByNameUseCase: jest.Mocked<GetCalendarByNameUseCaseInterface> = {
    execute: jest.fn()
  }

  let sut: SaveCalendarController

  beforeAll(() => {
    sut = new SaveCalendarController(getCalendarByNameUseCase)
  })

  beforeEach(() => {
    input = {
      body: {
        name: 'Calendar Test'
      }
    }
  })

  test('should return 400 if name is not provided', async () => {
    input.body.name = null

    const response = await sut.execute(input.body.name)

    expect(response).toEqual(badRequest(new MissingParamError('name')))
  })

  test('should call GetCalendarByNameUseCase once and with correct name', async () => {
    await sut.execute(input.body.name)

    expect(getCalendarByNameUseCase.execute).toHaveBeenCalledTimes(1)
    expect(getCalendarByNameUseCase.execute).toHaveBeenCalledWith('Calendar Test')
  })

  test('should return 400 if GetCalendarByNameUseCase returns an calendar', async () => {
    getCalendarByNameUseCase.execute.mockResolvedValueOnce({
      id: '123456789',
      name: 'Calendar Test',
      created_at: new Date('2023-01-01')
    })

    const response = await sut.execute(input.body.name)

    expect(response).toEqual(conflict(new ResourceConflictError('This name already exists')))
  })
})
