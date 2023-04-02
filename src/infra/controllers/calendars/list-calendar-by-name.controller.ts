import { GetCalendarByNameUseCaseInterface } from '@/application/interfaces/get-calendar-by-name-usecase.interface'
import { ControllerInterface } from '@/infra/interfaces/controller.interface'
import { success, serverError } from '@/shared/helpers/http'
import { HttpRequest, HttpResponse } from '@/shared/types/http'

export class ListCalendarByNameController implements ControllerInterface {
  constructor (private readonly getCalendarByNameUseCase: GetCalendarByNameUseCaseInterface) {}
  async execute (input: HttpRequest): Promise<HttpResponse> {
    try {
      const calendar = await this.getCalendarByNameUseCase.execute(input.params.name)
      return success(200, calendar)
    } catch (error) {
      return serverError(error)
    }
  }
}
