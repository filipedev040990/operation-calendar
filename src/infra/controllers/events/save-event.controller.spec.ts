import { ControllerInterface } from '@/infra/interfaces/controller.interface'
import { MissingParamError } from '@/shared/errors'
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
        calendar_id: '',
        name: '',
        category: '',
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
})
