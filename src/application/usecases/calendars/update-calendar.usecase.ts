import { UpdateCalendarRepositoryInterface, UpdateCalendarUseCaseInterface } from '@/application/interfaces'

export class UpdateCalendarUseCase implements UpdateCalendarUseCaseInterface {
  constructor (private readonly calendarRepository: UpdateCalendarRepositoryInterface) {}
  async execute (input: UpdateCalendarUseCaseInterface.Input): Promise<UpdateCalendarUseCaseInterface.Output> {
    const calendarUpdated = await this.calendarRepository.update({
      id: input.id,
      name: input.name
    })
    return calendarUpdated
  }
}
