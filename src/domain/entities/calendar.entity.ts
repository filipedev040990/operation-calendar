export class CalendarEntity {
  public readonly id: string
  public readonly name: string
  public readonly created_at: Date

  constructor (input: CalendarEntity.Input) {
    Object.assign(this, input)
  }
}

export namespace CalendarEntity {
  export type Input = {
    id: string
    name: string
    created_at: Date
  }
}
