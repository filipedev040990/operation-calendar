export interface UUIDGeneratorInterface {
  uuid (): UUIDGeneratorInterface.Output
}

export namespace UUIDGeneratorInterface {
  export type Output = string
}
