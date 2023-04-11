import { GetAllEventsRepositoryInterface, GetEventByNameRepositoryInterface, SaveEventeRepositoryInterface, UpdateEventeRepositoryInterface } from '@/application/interfaces/event-repository.interface'
import { prismaClient } from './prisma-client'
import { EventEntity } from '@/domain/entities/event.entity'

export class EventRepository implements SaveEventeRepositoryInterface, GetEventByNameRepositoryInterface, GetAllEventsRepositoryInterface, UpdateEventeRepositoryInterface {
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

  async getByName (name: string): Promise<EventEntity | null> {
    return await prismaClient.event.findFirst({ where: { name } })
  }

  async getAll (): Promise<GetAllEventsRepositoryInterface.Output []> {
    const events = await prismaClient.event.findMany({
      select: {
        id: true,
        name: true,
        start_date: true,
        end_date: true,
        calendar: {
          select: {
            id: true,
            name: true
          }
        }
      }
    })

    const eventsFormatted = events.map((event) => ({
      event_id: event.id,
      event_name: event.name,
      start_date: event.start_date,
      end_date: event.end_date,
      calendar_id: event.calendar.id,
      calendar_name: event.calendar.name
    }))

    return eventsFormatted
  }

  async update (input: SaveEventeRepositoryInterface.Input): Promise<SaveEventeRepositoryInterface.Output> {
    return await prismaClient.event.update({
      where: {
        id: input.id
      },
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
