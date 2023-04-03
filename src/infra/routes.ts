import { Router } from 'express'
import { expressRouterAdapter } from './adapters/express-route.adapter'
import { makeSaveCalendarControllerFactory } from './factories/controllers/save-calendar-controller.factory'
import { makeListAllCalendarsControllerFactory } from './factories/controllers/list-all-calendar-controller.factory'
import { makeListCalendarByNameControllerFactory } from './factories/controllers/list-calendar-by-name-controller.factory'
import { makeUpdateCalendarControllerFactory } from './factories/controllers/update-calendar-controller.factory'

const router = Router()

router.post('/calendar', expressRouterAdapter(makeSaveCalendarControllerFactory()))
router.get('/calendar', expressRouterAdapter(makeListAllCalendarsControllerFactory()))
router.get('/calendar/:name', expressRouterAdapter(makeListCalendarByNameControllerFactory()))
router.put('/calendar/:id', expressRouterAdapter(makeUpdateCalendarControllerFactory()))

export { router }
