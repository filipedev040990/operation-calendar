import { ListAllCalendarsUseCaseInterface } from '@/application/interfaces/list-all-calendars-usecase.interface'
import { CalendarEntity } from '@/domain/entities/calendar.entity'
import { serverError, success } from '@/shared/helpers/http'
import { HttpResponse } from '@/shared/types/http'

const fakeCalendars: CalendarEntity [] = [
  {
    id: '12345679',
    name: 'Calendar 1',
    created_at: new Date('2023-01-01 15:00:55')
  },
  {
    id: '999999',
    name: 'Calendar 2',
    created_at: new Date('2022-12-31 14:53:15')
  }
]

const listAllCalendarsUseCase: jest.Mocked<ListAllCalendarsUseCaseInterface> = {
  execute: jest.fn().mockResolvedValue(fakeCalendars)
}

export class ListAllCalendarsController {
  constructor (private readonly listAllCalendarsUseCase: ListAllCalendarsUseCaseInterface) {}
  async execute (): Promise<HttpResponse> {
    try {
      const calendars = await this.listAllCalendarsUseCase.execute()
      return success(200, calendars)
    } catch (error) {
      return serverError(error)
    }
  }
}

describe('ListAllCalendarsController', () => {
  let sut: ListAllCalendarsController

  beforeAll(() => {
    sut = new ListAllCalendarsController(listAllCalendarsUseCase)
  })
  test('should call ListAllCalendarsUseCase once', async () => {
    await sut.execute()

    expect(listAllCalendarsUseCase.execute).toHaveBeenCalledTimes(1)
  })

  test('should return all calendars', async () => {
    const calendars = await sut.execute()

    expect(calendars).toEqual(success(200, fakeCalendars))
  })

  test('should throw if listAllCalendarsUseCase.execute throws', async () => {
    listAllCalendarsUseCase.execute.mockImplementationOnce(() => {
      throw new Error()
    })

    const response = await sut.execute()

    expect(response).toEqual(serverError(new Error()))
  })
})
