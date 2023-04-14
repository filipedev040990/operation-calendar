import { EventEntity } from '@/domain/entities/event.entity'

export interface SaveEventUseCaseInterface {
  execute(input: SaveEvent.Input): Promise<SaveEvent.Output>
}

export namespace SaveEvent {
  export type Input = {
    calendar_id: string
    name: string
    category: string
    start_date: Date
    end_date: Date
  }

  export type Output = {
    id: string
    calendar_id: string
    name: string
    category: string
    start_date: Date
    end_date: Date
  }
}

export interface GetEventByNameUseCaseInterface {
  execute(name: string): Promise<EventEntity | null>
}

export interface GetAllEventsUseCaseInterface {
  execute(): Promise<GetAllEventsUseCaseInterface.Output []>
}

export namespace GetAllEventsUseCaseInterface {
  export type Output = {
    event_id: string
    event_name: string
    start_date: Date
    end_date: Date
    calendar_id: string
    calendar_name: string
  }
}

export interface GetEventByIdUseCaseInterface {
  execute(id: string): Promise<EventEntity | null>
}

export interface UpdateEventUseCaseInterface {
  execute(input: UpdateEventUseCaseInterface.Input): Promise<UpdateEventUseCaseInterface.Output>
}

export namespace UpdateEventUseCaseInterface {
  export type Input = {
    id: string
    calendar_id: string
    name: string
    category: string
    start_date: Date
    end_date: Date
  }

  export type Output = {
    id: string
    calendar_id: string
    name: string
    category: string
    start_date: Date
    end_date: Date
  }
}

export interface DeleteEventUseCaseInterface {
  execute(id: string): Promise<void>
}
