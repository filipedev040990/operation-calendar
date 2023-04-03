import { GetCalendarByNameUseCaseInterface, UpdateCalendarUseCaseInterface } from '@/application/interfaces'
import { MissingParamError, ResourceConflictError } from '@/shared/errors'
import { success, serverError, badRequest, conflict } from '@/shared/helpers/http'
import { HttpRequest, HttpResponse } from '@/shared/types/http'
import { ControllerInterface } from '@/infra/interfaces/controller.interface'

export class UpdateCalendarController implements ControllerInterface {
  constructor (
    private readonly getCalendarByNameUseCase: GetCalendarByNameUseCaseInterface,
    private readonly updateCalendarUseCase: UpdateCalendarUseCaseInterface
  ) {}

  async execute (input: HttpRequest): Promise<HttpResponse> {
    try {
      const error = await this.validateInput(input)
      if (error) {
        return error
      }

      const updateInput = {
        id: input.params.id,
        name: input.body.name
      }

      const updatedCalendar = await this.updateCalendarUseCase.execute(updateInput)

      return success(200, updatedCalendar)
    } catch (error) {
      return serverError(error)
    }
  }

  private async validateInput (input: HttpRequest): Promise<HttpResponse | null> {
    if (!input.params?.id) {
      return badRequest(new MissingParamError('id'))
    }

    if (!input.body?.name) {
      return badRequest(new MissingParamError('name'))
    }

    const nameExists = await this.getCalendarByNameUseCase.execute(input.body.name)
    if (nameExists && nameExists.id !== input.params.id) {
      return conflict(new ResourceConflictError('This name already exists'))
    }
  }
}
