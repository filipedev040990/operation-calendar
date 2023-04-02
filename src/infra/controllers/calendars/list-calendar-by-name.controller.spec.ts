import { GetCalendarByNameUseCaseInterface } from '@/application/interfaces/get-calendar-by-name-usecase.interface'
import { ControllerInterface } from '@/infra/interfaces/controller.interface'
import { success } from '@/shared/helpers/http'
import { HttpRequest, HttpResponse } from '@/shared/types/http'

const input = {
  params: {
    name: 'Calendar Test'
  }
}

const fakeCalendar = {
  id: '123456789',
  name: 'Calendar Test',
  created_at: new Date('2023-01-01 15:11:25')
}

const getCalendarByNameUseCase: jest.Mocked<GetCalendarByNameUseCaseInterface> = {
  execute: jest.fn().mockResolvedValue(fakeCalendar)
}

export class ListCalendarByNameController implements ControllerInterface {
  constructor (private readonly getCalendarByNameUseCase: GetCalendarByNameUseCaseInterface) {}
  async execute (input: HttpRequest): Promise<HttpResponse> {
    const calendar = await this.getCalendarByNameUseCase.execute(input.params?.name)
    return success(200, calendar)
  }
}

describe('ListCalendarByNameController', () => {
  let sut: ListCalendarByNameController
  beforeAll(() => {
    sut = new ListCalendarByNameController(getCalendarByNameUseCase)
  })

  test('should call GetCalendarByName once and with correct name', async () => {
    await sut.execute(input)

    expect(getCalendarByNameUseCase.execute).toHaveBeenCalledTimes(1)
    expect(getCalendarByNameUseCase.execute).toHaveBeenCalledWith('Calendar Test')
  })

  test('should return 200 and calendar', async () => {
    const response = await sut.execute(input)

    expect(response).toEqual(success(200, fakeCalendar))
  })
})
