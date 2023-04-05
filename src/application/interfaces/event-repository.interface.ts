import { EventEntity } from '@/domain/entities/event.entity'
import { SaveEvent } from './event-usecase.interface'

export interface SaveEventeRepositoryInterface {
  save (input: SaveEvent.Input): Promise<SaveEvent.Output>
}

export interface GetEventByNameRepositoryInterface {
  getByName (name: string): Promise<EventEntity | null>
}
