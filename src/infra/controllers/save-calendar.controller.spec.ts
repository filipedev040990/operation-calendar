import { MissingParamError } from '@/shared/errors'
import { badRequest } from '@/shared/helpers/http'
import { HttpResponse } from '@/shared/types/http'

export class SaveCalendarController {
  async execute (name: string): Promise<HttpResponse> {
    if (!name) {
      return badRequest(new MissingParamError('name'))
    }
    return null
  }
}

describe('SaveCalendarController', () => {
  const input = {
    body: {
      name: 'Zé das Couves'
    }
  }

  let sut: SaveCalendarController

  beforeAll(() => {
    sut = new SaveCalendarController()
  })

  test('should return 400 if name is not provided', async () => {
    input.body.name = null

    const response = await sut.execute(input.body.name)

    expect(response).toEqual(badRequest(new MissingParamError('name')))
  })
})
