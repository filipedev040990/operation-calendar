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
      const id = input.params?.id

      if (!id) {
        return badRequest(new MissingParamError('id'))
      }

      const calendar = await this.getCalendarByIdUseCase.execute(id)
      if (!calendar) {
        return badRequest(new InvalidParamError('id'))
      }

      await this.deleteCalendarUseCase.execute(id)

      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
