import { GetCalendarByIdUseCaseInterface, DeleteCalendarUseCaseInterface } from '@/application/interfaces'
import { ControllerInterface } from '@/infra/interfaces/controller.interface'
import { MissingParamError, InvalidParamError } from '@/shared/errors'
import { badRequest, noContent, serverError } from '@/shared/helpers/http'
import { HttpRequest, HttpResponse } from '@/shared/types/http'

export class DeleteCalendarController implements ControllerInterface {
  constructor (
    private readonly getCalendarByIdUseCase: GetCalendarByIdUseCaseInterface,
    private readonly deleteCalendarUseCase: DeleteCalendarUseCaseInterface
  ) {}

  async execute (input: HttpRequest): Promise<HttpResponse> {
    try {
      const error = await this.validateInput(input)
      if (error) {
        return error
      }

      await this.deleteCalendarUseCase.execute(input.params.id)

      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }

  private async validateInput (input: HttpRequest): Promise<HttpResponse | void> {
    if (!input.params?.id) {
      return badRequest(new MissingParamError('id'))
    }

    const calendar = await this.getCalendarByIdUseCase.execute(input.params.id)
    if (!calendar) {
      return badRequest(new InvalidParamError('id'))
    }
  }
}
