import { GetCalendarByNameUseCaseInterface, SaveCalendarUseCaseInterface } from '@/application/interfaces'
import { ControllerInterface } from '@/infra/interfaces/controller.interface'
import { MissingParamError, ResourceConflictError } from '@/shared/errors'
import { badRequest, conflict, success, serverError } from '@/shared/helpers/http'
import { HttpResponse } from '@/shared/types/http'

export class SaveCalendarController implements ControllerInterface {
  constructor (
    private readonly getCalendarByNameUseCase: GetCalendarByNameUseCaseInterface,
    private readonly saveCalendarUseCase: SaveCalendarUseCaseInterface
  ) {}

  async execute (input: SaveCalendarController.Input): Promise<HttpResponse> {
    try {
      const error = await this.validate(input.body?.name)
      if (error) {
        return error
      }
      const newCalendar = await this.saveCalendarUseCase.execute({ name: input.body.name })
      return success(201, newCalendar)
    } catch (error) {
      return serverError(error)
    }
  }

  private async validate (name: string): Promise<HttpResponse | void> {
    if (!name) {
      return badRequest(new MissingParamError('name'))
    }

    const calendarExists = await this.getCalendarByNameUseCase.execute(name)
    if (calendarExists) {
      return conflict(new ResourceConflictError('This name already exists'))
    }
  }
}

export namespace SaveCalendarController {
  export type Input = {
    body: {
      name: string
    }
  }
}
