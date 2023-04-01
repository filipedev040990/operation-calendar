import { GetCalendarByNameUseCaseInterface } from '@/application/interfaces/get-calendar-by-name-usecase.interface'
import { SaveCalendarUseCaseInterface } from '@/application/interfaces/save-calendar-usecase.interface'
import { MissingParamError, ResourceConflictError } from '@/shared/errors'
import { badRequest, conflict, success } from '@/shared/helpers/http'
import { HttpResponse } from '@/shared/types/http'

export class SaveCalendarController {
  constructor (
    private readonly getCalendarByNameUseCase: GetCalendarByNameUseCaseInterface,
    private readonly saveCalendarUseCase: SaveCalendarUseCaseInterface
  ) {}

  async execute (name: string): Promise<HttpResponse> {
    if (!name) {
      return badRequest(new MissingParamError('name'))
    }

    const calendarExists = await this.getCalendarByNameUseCase.execute(name)
    if (calendarExists) {
      return conflict(new ResourceConflictError('This name already exists'))
    }

    const newCalendar = await this.saveCalendarUseCase.execute({ name })
    return success(201, newCalendar)
  }
}

describe('SaveCalendarController', () => {
  let input: any

  const getCalendarByNameUseCase: jest.Mocked<GetCalendarByNameUseCaseInterface> = {
    execute: jest.fn()
  }

  const saveCalendarUseCase: jest.Mocked<SaveCalendarUseCaseInterface> = {
    execute: jest.fn().mockResolvedValue({
      id: '321654987',
      name: 'Calendar Test',
      created_at: new Date('2023-01-04 09:00:00')
    })
  }

  let sut: SaveCalendarController

  beforeAll(() => {
    sut = new SaveCalendarController(getCalendarByNameUseCase, saveCalendarUseCase)
  })

  beforeEach(() => {
    jest.clearAllMocks()
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

  test('should call SaveCalendarUseCase once and with correct values', async () => {
    await sut.execute(input.body.name)

    expect(saveCalendarUseCase.execute).toHaveBeenCalledTimes(1)
    expect(saveCalendarUseCase.execute).toHaveBeenCalledWith({ name: 'Calendar Test' })
  })

  test('should return an calendar', async () => {
    const response = await sut.execute(input.body.name)

    expect(response).toEqual({
      statusCode: 201,
      body: {
        id: '321654987',
        name: 'Calendar Test',
        created_at: new Date('2023-01-04 09:00:00')
      }
    })
  })
})
