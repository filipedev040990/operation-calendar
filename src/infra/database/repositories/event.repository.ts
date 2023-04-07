import { SaveEventeRepositoryInterface } from '@/application/interfaces/event-repository.interface'
import { prismaClient } from './prisma-client'

export class EventRepository implements SaveEventeRepositoryInterface {
  async save (input: SaveEventeRepositoryInterface.Input): Promise<SaveEventeRepositoryInterface.Output> {
    return await prismaClient.event.create({
      data: {
        id: input.id,
        calendar_id: input.calendar_id,
        name: input.name,
        category: input.category,
        start_date: input.start_date,
        end_date: input.end_date
      }
    })
  }
}
