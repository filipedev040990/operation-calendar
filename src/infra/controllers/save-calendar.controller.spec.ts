import { GetCalendarByNameUseCaseInterface } from '@/application/interfaces/get-calendar-by-name-usecase.interface'
import { MissingParamError } from '@/shared/errors'
import { badRequest } from '@/shared/helpers/http'
import { HttpResponse } from '@/shared/types/http'

export class SaveCalendarController {
  constructor (private readonly getCalendarByNameUseCase: GetCalendarByNameUseCaseInterface) {}
  async execute (name: string): Promise<HttpResponse> {
    if (!name) {
      return badRequest(new MissingParamError('name'))
    }

    await this.getCalendarByNameUseCase.execute(name)
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
        name: 'Zé das Couves'
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
    expect(getCalendarByNameUseCase.execute).toHaveBeenCalledWith('Zé das Couves')
  })
})
