import { ControllerInterface } from '@/infra/interfaces/controller.interface'
import { InvalidParamError, MissingParamError } from '@/shared/errors'
import { badRequest } from '@/shared/helpers/http'
import { HttpRequest, HttpResponse } from '@/shared/types/http'

export class SaveEventController implements ControllerInterface {
  async execute (input: HttpRequest): Promise<HttpResponse> {
    const error = this.validateInput(input)
    if (error) {
      return error
    }
    return null
  }

  private validateInput (input: HttpRequest): HttpResponse | void {
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
  }
}

describe('SaveEventController', () => {
  let input: HttpRequest
  let sut: SaveEventController

  beforeAll(() => {
    sut = new SaveEventController()
  })
  beforeEach(() => {
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
})
