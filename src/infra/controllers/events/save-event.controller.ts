import { GetCalendarByIdUseCaseInterface } from '@/application/interfaces'
import { GetEventByNameUseCaseInterface } from '@/application/interfaces/event-usecase.interface'
import { ControllerInterface } from '@/infra/interfaces/controller.interface'
import { MissingParamError, InvalidParamError, ResourceConflictError } from '@/shared/errors'
import { badRequest, conflict } from '@/shared/helpers/http'
import { HttpRequest, HttpResponse } from '@/shared/types/http'

export class SaveEventController implements ControllerInterface {
  constructor (
    private readonly getCalendarByIdUseCase: GetCalendarByIdUseCaseInterface,
    private readonly getEventCalendarByName: GetEventByNameUseCaseInterface
  ) {}

  async execute (input: HttpRequest): Promise<HttpResponse> {
    const error = await this.validateInput(input)
    if (error) {
      return error
    }
    return null
  }

  private async validateInput (input: HttpRequest): Promise<HttpResponse | void> {
    const requiredFields = ['calendar_id', 'name', 'category', 'start_date']

    for (const field of requiredFields) {
      if (!input.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }

    const validCategories = ['NORMAL', 'WARNING', 'CRITICAL']

    if (!validCategories.includes(input.body.category)) {
      return badRequest(new InvalidParamError('category'))
    }

    const calendar = await this.getCalendarByIdUseCase.execute(input.body.calendar_id)
    if (!calendar) {
      return badRequest(new InvalidParamError('calendar_id'))
    }

    const event = await this.getEventCalendarByName.execute(input.body.name)
    if (event) {
      return conflict(new ResourceConflictError('This event already exists'))
    }

    if (input.body?.end_date < input.body.start_date) {
      return badRequest(new InvalidParamError('end_date'))
    }
  }
}
