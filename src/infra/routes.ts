import { Router } from 'express'
import { expressRouterAdapter } from './adapters/express-route.adapter'
import { makeSaveCalendarControllerFactory } from './factories/controllers/save-calendar-controller.factory'
import { makeListAllCalendarsControllerFactory } from './factories/controllers/list-all-calendar-controller.factory'

const router = Router()

router.post('/calendar', expressRouterAdapter(makeSaveCalendarControllerFactory()))
router.get('/calendar', expressRouterAdapter(makeListAllCalendarsControllerFactory()))

export { router }
