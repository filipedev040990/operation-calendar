import { HttpRequest, HttpResponse } from '@/shared/types/http'

export interface ControllerInterface {
  execute(input: HttpRequest): Promise<HttpResponse>
}
