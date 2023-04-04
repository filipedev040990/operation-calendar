import { SaveEvent } from './event-usecase.interface'

export interface SaveEventeRepositoryInterface {
  save (input: SaveEvent.Input): Promise<SaveEvent.Output>
}
