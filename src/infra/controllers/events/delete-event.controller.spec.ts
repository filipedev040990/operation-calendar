import { MissingParamError } from '@/shared/errors'
import { badRequest } from '@/shared/helpers/http'
import { DeleteEventController } from './delete-event.controller'
import { HttpRequest } from '@/shared/types/http'
import { DeleteEventUseCaseInterface } from '@/application/interfaces/event-usecase.interface'

const deleteEventUseCase: jest.Mocked<DeleteEventUseCaseInterface> = {
  execute: jest.fn()
}

describe('DeleteEventController', () => {
  let sut: DeleteEventController
  let input: HttpRequest

  beforeAll(() => {
    sut = new DeleteEventController(deleteEventUseCase)
  })

  beforeEach(() => {
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

  test('should call DeleteEventUseCase once and with correct id', async () => {
    await sut.execute(input)

    expect(deleteEventUseCase.execute).toHaveBeenCalledTimes(1)
    expect(deleteEventUseCase.execute).toHaveBeenCalledWith('anyEventId')
  })
})
