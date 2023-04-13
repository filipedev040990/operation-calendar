import { calendarPath } from './paths/calendar.path'
import { calendarSchema } from './schemas/calendar.schema'

export default {
  openapi: '3.0.0',
  info: {
    title: 'API calendario operacional',
    description: 'Documentação da API de calendario operacional',
    version: '1.0.0'
  },
  servers: [{
    url: '/api'
  }],
  tags: [{
    name: 'Calendar'
  }],
  paths: {
    '/calendar': calendarPath
  },
  schemas: {
    calendarSchema
  }

}
