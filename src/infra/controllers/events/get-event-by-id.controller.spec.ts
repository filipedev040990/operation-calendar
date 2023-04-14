import { GetEventByIdUseCaseInterface } from '@/application/interfaces/event-usecase.interface'
import { ControllerInterface } from '@/infra/interfaces/controller.interface'
import { noContent } from '@/shared/helpers/http'
import { HttpRequest, HttpResponse } from '@/shared/types/http'

export class GetEventByIdController implements ControllerInterface {
  constructor (private readonly getEventByIdUseCase: GetEventByIdUseCaseInterface) {}
  async execute (input: HttpRequest): Promise<HttpResponse> {
    await this.getEventByIdUseCase.execute(input.params?.id)
    return noContent()
  }
}

const getEventByIdUseCase: jest.Mocked<GetEventByIdUseCaseInterface> = {
  execute: jest.fn()
}

describe('GetEventByIdController', () => {
  let input: HttpRequest
  let sut: GetEventByIdController

  beforeAll(() => {
    input = {
      params: {
        id: 'anyEventId'
      }
    }
    sut = new GetEventByIdController(getEventByIdUseCase)
  })
  test('should call GetEventByIdUseCase once and with correct id', async () => {
    await sut.execute(input)

    expect(getEventByIdUseCase.execute).toHaveBeenCalledTimes(1)
    expect(getEventByIdUseCase.execute).toHaveBeenCalledWith('anyEventId')
  })

  test('should return null if GetEventByIdUseCase returns null', async () => {
    const response = await sut.execute(input)

    expect(response).toEqual(noContent())
  })
})
