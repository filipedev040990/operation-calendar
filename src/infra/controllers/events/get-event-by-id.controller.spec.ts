import { GetEventByIdUseCaseInterface } from '@/application/interfaces/event-usecase.interface'
import { noContent } from '@/shared/helpers/http'
import { HttpRequest } from '@/shared/types/http'
import { GetEventByIdController } from './get-event-by-id.controller'

const getEventByIdUseCase: jest.Mocked<GetEventByIdUseCaseInterface> = {
  execute: jest.fn().mockResolvedValue({
    id: 'anyId',
    calendar_id: 'anyCalendarId',
    category: 'NORMAL',
    name: 'anyName',
    start_date: new Date('2023-01-01'),
    end_date: new Date('2023-01-03')
  })
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
    getEventByIdUseCase.execute.mockResolvedValueOnce(null)

    const response = await sut.execute(input)

    expect(response).toEqual(noContent())
  })

  test('should return a Event', async () => {
    const response = await sut.execute(input)

    expect(response).toEqual({
      statusCode: 200,
      body: {
        id: 'anyId',
        calendar_id: 'anyCalendarId',
        category: 'NORMAL',
        name: 'anyName',
        start_date: new Date('2023-01-01'),
        end_date: new Date('2023-01-03')
      }
    })
  })
})
