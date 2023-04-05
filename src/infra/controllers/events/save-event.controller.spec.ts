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
    const requiredFields = ['calendar_id']

    for (const field of requiredFields) {
      if (!input.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
  }
}

describe('SaveEventController', () => {
  let input: HttpRequest
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
  test('should return 400 if calendar id is not provided', async () => {
    input.body.calendar_id = null
    const sut = new SaveEventController()

    const response = await sut.execute(input)

    expect(response).toEqual(badRequest(new MissingParamError('calendar_id')))
  })
})
