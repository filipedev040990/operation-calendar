import { GetCalendarByNameUseCaseInterface } from '@/application/interfaces'
import { serverError, success } from '@/shared/helpers/http'
import { GetCalendarByNameController } from './get-calendar-by-name.controller'

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

describe('GetCalendarByNameController', () => {
  let sut: GetCalendarByNameController
  beforeAll(() => {
    sut = new GetCalendarByNameController(getCalendarByNameUseCase)
  })

  test('should call GetCalendarByNameUseCase once and with correct name', async () => {
    await sut.execute(input)

    expect(getCalendarByNameUseCase.execute).toHaveBeenCalledTimes(1)
    expect(getCalendarByNameUseCase.execute).toHaveBeenCalledWith('Calendar Test')
  })

  test('should return 200 and calendar', async () => {
    const response = await sut.execute(input)

    expect(response).toEqual(success(200, fakeCalendar))
  })

  test('should return null if GetCalendarByNameUseCase returns null', async () => {
    getCalendarByNameUseCase.execute.mockResolvedValueOnce(null)

    const response = await sut.execute(input)

    expect(response).toEqual(success(200, null))
  })

  test('should throw if GetCalendarByNameUseCase throws', async () => {
    getCalendarByNameUseCase.execute.mockImplementationOnce(() => { throw new Error() })

    const response = await sut.execute(input)

    expect(response).toEqual(serverError(new Error()))
  })
})
