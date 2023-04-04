import { Router } from 'express'
import { expressRouterAdapter } from './adapters/express-route.adapter'
import { makeSaveCalendarControllerFactory } from './factories/controllers/save-calendar-controller.factory'
import { makeListAllCalendarsControllerFactory } from './factories/controllers/list-all-calendar-controller.factory'
import { makeGetCalendarByNameControllerFactory } from './factories/controllers/get-calendar-by-name-controller.factory'
import { makeUpdateCalendarControllerFactory } from './factories/controllers/update-calendar-controller.factory'
import { makeDeleteCalendarControllerFactory } from './factories/controllers/delete-calendar-controller.factory'

const router = Router()

router.post('/calendar', expressRouterAdapter(makeSaveCalendarControllerFactory()))
router.get('/calendar', expressRouterAdapter(makeListAllCalendarsControllerFactory()))
router.get('/calendar/:name', expressRouterAdapter(makeGetCalendarByNameControllerFactory()))
router.put('/calendar/:id', expressRouterAdapter(makeUpdateCalendarControllerFactory()))
router.delete('/calendar/:id', expressRouterAdapter(makeDeleteCalendarControllerFactory()))

export { router }
