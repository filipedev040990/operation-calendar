import { GetCalendarByNameRepository, SaveCalendarRepositoryInterface } from '@/application/interfaces'
import { prismaClient } from './prisma-client'
import { CalendarEntity } from '@/domain/entities/calendar.entity'

export class CalendarRepository implements SaveCalendarRepositoryInterface, GetCalendarByNameRepository {
  async save (input: SaveCalendarRepositoryInterface.Input): Promise<SaveCalendarRepositoryInterface.Input> {
    return await prismaClient.calendar.create({
      data: {
        id: input.id,
        name: input.name,
        created_at: input.created_at
      }
    })
  }

  async getByName (name: string): Promise<CalendarEntity> {
    return await prismaClient.calendar.findFirst({ where: { name } })
  }
}
