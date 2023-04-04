import { CategoryOptions } from '@/application/interfaces/event-usecase.interface'

export class EventEntity {
  public id: string
  public calendar_id: string
  public name: string
  public category: CategoryOptions
  public start_date: Date
  public end_date: Date

  constructor (input: EventEntity.Input) {
    Object.assign(this, input)
  }
}

export namespace EventEntity {
  export type Input = {
    id: string
    calendar_id: string
    name: string
    category: string
    start_date: Date
    end_date: Date
  }
}
