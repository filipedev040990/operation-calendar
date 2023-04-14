import { GetEventByIdUseCaseInterface } from '@/application/interfaces/event-usecase.interface'
import { ControllerInterface } from '@/infra/interfaces/controller.interface'
import { success, noContent } from '@/shared/helpers/http'
import { HttpRequest, HttpResponse } from '@/shared/types/http'

export class GetEventByIdController implements ControllerInterface {
  constructor (private readonly getEventByIdUseCase: GetEventByIdUseCaseInterface) {}
  async execute (input: HttpRequest): Promise<HttpResponse> {
    const event = await this.getEventByIdUseCase.execute(input.params?.id)
    return event ? success(200, event) : noContent()
  }
}
