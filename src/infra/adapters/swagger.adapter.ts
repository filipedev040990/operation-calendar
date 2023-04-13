import swaggerConfig from '@/infra/documentation/swagger'
import { noCache } from '@/infra/documentation/swagger/no-cache-middleware'
import { serve, setup } from 'swagger-ui-express'
import { Express } from 'express'

export default (app: Express): void => {
  app.use('/api-docs', noCache, serve, setup(swaggerConfig))
}
