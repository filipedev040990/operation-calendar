import { MissingParamError } from '@/shared/errors'
import { badRequest } from '@/shared/helpers/http'
import { HttpRequest, HttpResponse } from '@/shared/types/http'
import { ControllerInterface } from '@/infra/interfaces/controller.interface'

export class UpdateCalendarController implements ControllerInterface {
  async execute (input: HttpRequest): Promise<HttpResponse> {
    if (!input.params?.id) {
      return badRequest(new MissingParamError('id'))
    }
    return null
  }
}

describe('UpdateCalendarController', () => {
  let sut: UpdateCalendarController
  let input: HttpRequest

  beforeAll(() => {
    sut = new UpdateCalendarController()
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
})
