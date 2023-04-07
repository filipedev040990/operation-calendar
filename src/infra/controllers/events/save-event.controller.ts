import { GetCalendarByIdUseCaseInterface } from '@/application/interfaces'
import { GetEventByNameUseCaseInterface, SaveEventUseCaseInterface } from '@/application/interfaces/event-usecase.interface'
import { ControllerInterface } from '@/infra/interfaces/controller.interface'
import { MissingParamError, InvalidParamError, ResourceConflictError } from '@/shared/errors'
import { badRequest, conflict, success } from '@/shared/helpers/http'
import { HttpRequest, HttpResponse } from '@/shared/types/http'

export class SaveEventController implements ControllerInterface {
  constructor (
    private readonly getCalendarByIdUseCase: GetCalendarByIdUseCaseInterface,
    private readonly getEventByName: GetEventByNameUseCaseInterface,
    private readonly saveEventUseCase: SaveEventUseCaseInterface
  ) {}

  async execute (input: HttpRequest): Promise<HttpResponse> {
    const missingParam = this.requiredParamsValidator(input)
    if (missingParam) {
      return badRequest(new MissingParamError(missingParam))
    }

    const invalidCategory = this.categoryValidator(input.body.category)
    if (invalidCategory) {
      return badRequest(new InvalidParamError('category'))
    }

    const calendar = await this.getCalendarByIdUseCase.execute(input.body.calendar_id)
    if (!calendar) {
      return badRequest(new InvalidParamError('calendar_id'))
    }

    const event = await this.getEventByName.execute(input.body.name)
    if (event) {
      return conflict(new ResourceConflictError('This event already exists'))
    }

    const invalidEndDate = this.endDateValidator(input)
    if (invalidEndDate) {
      return badRequest(new InvalidParamError('end_date'))
    }

    const newEvent = await this.saveEventUseCase.execute({
      calendar_id: input.body.calendar_id,
      name: input.body.name,
      category: input.body.category,
      start_date: input.body.start_date,
      end_date: input.body.end_date ?? input.body.start_date
    })
    return success(201, newEvent)
  }

  private requiredParamsValidator (input: HttpRequest): string | void {
    const requiredFields = ['calendar_id', 'name', 'category', 'start_date']
    for (const field of requiredFields) {
      if (!input.body[field]) {
        return field
      }
    }
  }

  private categoryValidator (category: string): string | void {
    const validCategories = ['NORMAL', 'WARNING', 'CRITICAL']
    if (!validCategories.includes(category)) {
      return category
    }
  }

  private endDateValidator (input: HttpRequest): Date | void {
    if (input.body?.end_date < input.body.start_date) {
      return input.body.end_date
    }
  }
}
