import { GetCalendarByNameUseCaseInterface } from '@/application/interfaces/get-calendar-by-name-usecase.interface'
import { SaveCalendarUseCaseInterface } from '@/application/interfaces/save-calendar-usecase.interface'
import { MissingParamError, ResourceConflictError } from '@/shared/errors'
import { badRequest, conflict, success, serverError } from '@/shared/helpers/http'
import { HttpResponse } from '@/shared/types/http'

export class SaveCalendarController {
  constructor (
    private readonly getCalendarByNameUseCase: GetCalendarByNameUseCaseInterface,
    private readonly saveCalendarUseCase: SaveCalendarUseCaseInterface
  ) {}

  async execute (name: string): Promise<HttpResponse> {
    try {
      if (!name) {
        return badRequest(new MissingParamError('name'))
      }

      const calendarExists = await this.getCalendarByNameUseCase.execute(name)
      if (calendarExists) {
        return conflict(new ResourceConflictError('This name already exists'))
      }

      const newCalendar = await this.saveCalendarUseCase.execute({ name })
      return success(201, newCalendar)
    } catch (error) {
      return serverError(error)
    }
  }
}
