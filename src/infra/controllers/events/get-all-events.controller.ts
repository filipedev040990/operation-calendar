import { GetAllEventsUseCaseInterface } from '@/application/interfaces/event-usecase.interface'
import { ControllerInterface } from '@/infra/interfaces/controller.interface'
import { success, serverError } from '@/shared/helpers/http'
import { HttpResponse } from '@/shared/types/http'

export class GetAllEventsController implements ControllerInterface {
  constructor (private readonly getAllEventsUseCase: GetAllEventsUseCaseInterface) {}
  async execute (): Promise<HttpResponse> {
    try {
      const events = await this.getAllEventsUseCase.execute()
      return success(200, events)
    } catch (error) {
      return serverError(error)
    }
  }
}
