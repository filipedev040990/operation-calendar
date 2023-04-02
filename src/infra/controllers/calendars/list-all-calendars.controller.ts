import { ListAllCalendarsUseCaseInterface } from '@/application/interfaces/list-all-calendars-usecase.interface'
import { serverError, success } from '@/shared/helpers/http'
import { HttpResponse } from '@/shared/types/http'

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
