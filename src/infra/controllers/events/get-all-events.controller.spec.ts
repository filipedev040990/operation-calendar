import { GetAllEventsUseCaseInterface } from '@/application/interfaces/event-usecase.interface'
import { ControllerInterface } from '@/infra/interfaces/controller.interface'
import { HttpResponse } from '@/shared/types/http'

export class GetAllEventsController implements ControllerInterface {
  constructor (private readonly getAllEventsUseCase: GetAllEventsUseCaseInterface) {}
  async execute (): Promise<HttpResponse> {
    await this.getAllEventsUseCase.execute()
    return null
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
})
