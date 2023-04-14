import { MissingParamError } from '@/shared/errors'
import { badRequest } from '@/shared/helpers/http'
import { DeleteEventController } from './delete-event.controller'
import { HttpRequest } from '@/shared/types/http'

describe('DeleteEventController', () => {
  let sut: DeleteEventController
  let input: HttpRequest

  beforeAll(() => {
    sut = new DeleteEventController()
    input = {
      params: {
        id: 'anyEventId'
      }
    }
  })
  test('should return 400 if id is not provided', async () => {
    input.params = null

    const response = await sut.execute(input)

    expect(response).toEqual(badRequest(new MissingParamError('id')))
  })
})
