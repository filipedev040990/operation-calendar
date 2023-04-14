import { DeleteEventUseCaseInterface, GetEventByIdUseCaseInterface } from '@/application/interfaces/event-usecase.interface'
import { ControllerInterface } from '@/infra/interfaces/controller.interface'
import { MissingParamError } from '@/shared/errors'
import { badRequest, noContent, serverError } from '@/shared/helpers/http'
import { HttpRequest, HttpResponse } from '@/shared/types/http'

export class DeleteEventController implements ControllerInterface {
  constructor (
    private readonly getEventByIdUseCase: GetEventByIdUseCaseInterface,
    private readonly deleteEventUseCase: DeleteEventUseCaseInterface
  ) {}

  async execute (input: HttpRequest): Promise<HttpResponse> {
    if (!input?.params?.id) {
      return badRequest(new MissingParamError('id'))
    }

    try {
      const { id } = input.params

      await this.getEventByIdUseCase.execute(id)
      await this.deleteEventUseCase.execute(id)
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
