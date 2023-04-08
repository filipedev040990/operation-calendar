import { GetAllEventsUseCaseInterface } from '@/application/interfaces/event-usecase.interface'
import { ControllerInterface } from '@/infra/interfaces/controller.interface'
import { serverError, success } from '@/shared/helpers/http'
import { HttpResponse } from '@/shared/types/http'

export class GetAllEventsController implements ControllerInterface {
  constructor (private readonly getAllEventsUseCase: GetAllEventsUseCaseInterface) {}
  async execute (): Promise<HttpResponse> {
    try {
      const events = await this.getAllEventsUseCase.execute()
      return success(200, events)
    } catch (error) {
      return serverError(error)
    }
  }
}

const fakeEvents = [{
  event_id: 'anyEventId',
  event_name: 'anyEventName',
  start_date: new Date('2023-01-01 15:20:15'),
  end_date: new Date('2023-01-01 15:20:15'),
  calendar_id: 'anyCalendarId',
  calendar_name: 'anyCalendarName'
}]

const getAllEventsUseCase: jest.Mocked<GetAllEventsUseCaseInterface> = {
  execute: jest.fn().mockResolvedValue(fakeEvents)
}

describe('GetAllEventsController', () => {
  let sut: GetAllEventsController
  beforeAll(() => {
    sut = new GetAllEventsController(getAllEventsUseCase)
  })

  test('should call GetAllEventsUseCase once', async () => {
    await sut.execute()

    expect(getAllEventsUseCase.execute).toHaveBeenCalledTimes(1)
  })

  test('should return all events', async () => {
    const response = await sut.execute()

    expect(response).toEqual({
      statusCode: 200,
      body: fakeEvents
    })
  })

  test('should return null if GetAllEventsUseCase returns null', async () => {
    getAllEventsUseCase.execute.mockResolvedValueOnce(null)

    const response = await sut.execute()

    expect(response).toEqual({
      statusCode: 200,
      body: null
    })
  })

  test('should throw if GetAllEventsUseCase throws', async () => {
    getAllEventsUseCase.execute.mockImplementationOnce(() => {
      throw new Error()
    })

    const response = await sut.execute()

    expect(response).toEqual(serverError(new Error()))
  })
})
