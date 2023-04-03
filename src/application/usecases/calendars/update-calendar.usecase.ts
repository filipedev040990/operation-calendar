import { UpdateCalendarRepositoryInterface } from '@/application/interfaces'
import { UpdateCalendarUseCaseInterface } from '@/application/interfaces/update-calendar-usecase.interface'

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
