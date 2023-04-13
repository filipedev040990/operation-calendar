export const addCalendarOutputSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      example: 'd8dc0b4d-e438-4204-8173-58f8d96c2cc8'
    },
    name: {
      type: 'string',
      example: 'New Calendar'
    },
    created_at: {
      type: 'Date',
      example: '2023-01-01 00:00:00'
    }
  },
  example: {
    id: 'bfe6f881-522a-45c5-ac01-a854084fb313',
    name: 'New Calendar',
    created_at: '2023-04-13 18:15:21'
  }
}
