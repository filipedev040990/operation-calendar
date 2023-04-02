import { HttpResponse } from '@/shared/types/http'
import { Request, Response } from 'express'

export const expressRouterAdapter = (controller: any) => {
  return async (req: Request, res: Response) => {
    const response: HttpResponse = await controller.execute(req)
    const bodyResponse = response.statusCode === 500 ? { error: response.body.error } : response.body
    res.status(response.statusCode).json(bodyResponse)
  }
}
