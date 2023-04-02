import { ServerError } from '@/shared/errors'
import { HttpResponse } from '@/shared/types/http'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error.message
})

export const conflict = (error: Error): HttpResponse => ({
  statusCode: 409,
  body: error.message
})

export const success = (status: number, body: any): HttpResponse => ({
  statusCode: status,
  body
})

export const serverError = (error: unknown): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error instanceof Error ? error : undefined)
})
