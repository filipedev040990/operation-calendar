import { DeleteCalendarRepositoryInterface, DeleteCalendarUseCaseInterface } from '@/application/interfaces'

export class DeleteCalendarUseCase implements DeleteCalendarUseCaseInterface {
  constructor (private readonly calendarRepository: DeleteCalendarRepositoryInterface) {}
  async execute (id: string): Promise<void> {
    await this.calendarRepository.delete(id)
  }
}
