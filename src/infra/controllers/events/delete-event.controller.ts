import { DeleteEventUseCaseInterface } from '@/application/interfaces/event-usecase.interface'
import { ControllerInterface } from '@/infra/interfaces/controller.interface'
import { MissingParamError } from '@/shared/errors'
import { badRequest } from '@/shared/helpers/http'
import { HttpRequest, HttpResponse } from '@/shared/types/http'

export class DeleteEventController implements ControllerInterface {
  constructor (private readonly deleteEventUseCase: DeleteEventUseCaseInterface) {}
  async execute (input: HttpRequest): Promise<HttpResponse> {
    if (!input?.params?.id) {
      return badRequest(new MissingParamError('id'))
    }
    await this.deleteEventUseCase.execute(input.params.id)
    return null
  }
}
