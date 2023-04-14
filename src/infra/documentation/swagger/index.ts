import { GetEventById, calendarPath, eventPath, getCalendarByNamePath, deleteCalendarPath } from './paths'
import { calendarSchema, addCalendarInputSchema, addCalendarOutputSchema, serverErrorSchema, addEventInputSchema, addEventOutputSchema, eventSchema } from './schemas'

export default {
  openapi: '3.0.0',
  info: {
    title: 'API calendário operacional.',
    description: 'Documentação da API de calendario operacional.',
    version: '1.0.0'
  },
  servers: [{
    url: '/api'
  }],
  tags: [{
    name: 'Calendar'
  }, {
    name: 'Event'
  }],
  paths: {
    '/calendar': calendarPath,
    '/calendar/{name}': getCalendarByNamePath,
    '/calendar/{id}': deleteCalendarPath,
    '/event': eventPath,
    '/event/{id}': GetEventById
  },
  schemas: {
    calendarSchema,
    addCalendarInputSchema,
    addCalendarOutputSchema,
    serverErrorSchema,
    addEventInputSchema,
    addEventOutputSchema,
    eventSchema
  }
}
