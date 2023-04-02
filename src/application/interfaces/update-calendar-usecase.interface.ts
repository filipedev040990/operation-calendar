export interface UpdateCalendarUseCaseInterface {
  execute(input: UpdateCalendarUseCaseInterface.Input): Promise<UpdateCalendarUseCaseInterface.Output>
}

export namespace UpdateCalendarUseCaseInterface {
  export type Input = {
    id: string
    name: string
  }
  export type Output = {
    id: string
    name: string
    created_at: Date
  }
}
