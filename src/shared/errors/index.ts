export class MissingParamError extends Error {
  constructor (paramName: string) {
    super(`Missing param: ${paramName}`)
    this.name = 'MissingParamError'
  }
}

export class ResourceConflictError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'ResourceConflictError'
  }
}
