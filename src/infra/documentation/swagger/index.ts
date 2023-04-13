import { calendarPath, getCalendarByNamePath } from './paths'
import { calendarSchema, addCalendarInputSchema, addCalendarOutputSchema, errorSchema } from './schemas'

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
  }],
  paths: {
    '/calendar': calendarPath,
    '/calendar/{name}': getCalendarByNamePath
  },
  schemas: {
    calendarSchema,
    addCalendarInputSchema,
    addCalendarOutputSchema,
    errorSchema
  }

}
