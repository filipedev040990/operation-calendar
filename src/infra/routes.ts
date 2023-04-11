import { Router } from 'express'
import { expressRouterAdapter } from './adapters/express-route.adapter'
import { makeSaveCalendarControllerFactory } from './factories/controllers/calendar/save-calendar-controller.factory'
import { makeListAllCalendarsControllerFactory } from './factories/controllers/calendar/list-all-calendar-controller.factory'
import { makeGetCalendarByNameControllerFactory } from './factories/controllers/calendar/get-calendar-by-name-controller.factory'
import { makeUpdateCalendarControllerFactory } from './factories/controllers/calendar/update-calendar-controller.factory'
import { makeDeleteCalendarControllerFactory } from './factories/controllers/calendar/delete-calendar-controller.factory'
import { makeSaveEventControllerFactory } from './factories/controllers/event/save-event-controller.factory'
import { makeGetAllEventsControllerFactory } from './factories/controllers/event/get-all-events-controller.factory'
import { makeUpdateEventControllerFactory } from './factories/controllers/event/update-event-controller.factory'

const router = Router()

router.post('/calendar', expressRouterAdapter(makeSaveCalendarControllerFactory()))
router.get('/calendar', expressRouterAdapter(makeListAllCalendarsControllerFactory()))
router.get('/calendar/:name', expressRouterAdapter(makeGetCalendarByNameControllerFactory()))
router.put('/calendar/:id', expressRouterAdapter(makeUpdateCalendarControllerFactory()))
router.delete('/calendar/:id', expressRouterAdapter(makeDeleteCalendarControllerFactory()))

router.post('/event', expressRouterAdapter(makeSaveEventControllerFactory()))
router.get('/event', expressRouterAdapter(makeGetAllEventsControllerFactory()))
router.put('/event/:id', expressRouterAdapter(makeUpdateEventControllerFactory()))

export { router }
