import { ControllerInterface } from '@/infra/interfaces/controller.interface'
import { MissingParamError } from '@/shared/errors'
import { badRequest } from '@/shared/helpers/http'
import { HttpRequest, HttpResponse } from '@/shared/types/http'

export class DeleteCalendarController implements ControllerInterface {
  async execute (input: HttpRequest): Promise<HttpResponse> {
    if (!input.params?.id) {
      return badRequest(new MissingParamError('id'))
    }
    return null
  }
}

const input: HttpRequest = {
  params: {
    id: 'anyId'
  }
}

describe('DeleteCalendarController', () => {
  let sut: DeleteCalendarController
  beforeAll(() => {
    sut = new DeleteCalendarController()
  })
  test('should return 400 if id is not provided', async () => {
    input.params.id = null

    const response = await sut.execute(input)

    expect(response).toEqual(badRequest(new MissingParamError('id')))
  })
})
