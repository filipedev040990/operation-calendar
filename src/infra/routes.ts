import { Router } from 'express'
import { expressRouterAdapter } from './adapters/express-route.adapter'
import { makeSaveCalendarControllerFactory } from './factories/controllers/save-calendar-controller.factory'

const router = Router()

router.post('/calendar', expressRouterAdapter(makeSaveCalendarControllerFactory()))

export { router }
