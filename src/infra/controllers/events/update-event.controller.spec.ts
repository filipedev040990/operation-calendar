import { ControllerInterface } from '@/infra/interfaces/controller.interface'
import { MissingParamError } from '@/shared/errors'
import { badRequest } from '@/shared/helpers/http'
import { HttpRequest, HttpResponse } from '@/shared/types/http'
import MockDate from 'mockdate'

export class UpdateEventController implements ControllerInterface {
  async execute (input: HttpRequest): Promise<HttpResponse> {
    const missingParam = this.requiredParamsValidator(input)
    if (missingParam) {
      return badRequest(new MissingParamError(missingParam))
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
}

describe('UpdateEventController', () => {
  let sut: UpdateEventController
  let input: HttpRequest

  beforeAll(() => {
    MockDate.set(new Date())
    sut = new UpdateEventController()
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
})
